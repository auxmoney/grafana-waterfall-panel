import React from 'react';
import moment from 'moment';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory, useTheme } from '@grafana/ui';

interface Props extends PanelProps<SimpleOptions> {}

class Bar {
  time: moment.Moment;
  endTime: moment.Moment;
  value: moment.Duration;
  name: string;

  constructor(time: number, value: number, name: string, valueUnit: moment.unitOfTime.Base) {
    this.time = moment(time).utc();
    this.value = moment.duration(value, valueUnit);
    this.name = name;
    this.endTime = moment(time).utc().add(this.value);
  }
}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();
  const styles = getStyles();
  let color: string;
  let fillColor: string;
  switch (options.color) {
    case 'red':
      color = theme.palette.redBase;
      fillColor = theme.palette.redShade;
      break;
    case 'green':
      color = theme.palette.greenBase;
      fillColor = theme.palette.greenShade;
      break;
  }

  if (data.series.length != 1) {
    throw new Error('You need exactly 1 time series for this plugin to work.');
  }

  const series = data.series[0];

  if (series.fields.filter(field => ['Time', 'value'].includes(field?.name)).length != 2) {
    throw new Error('You need at least the fields "Time" and "value" for this plugin to work.');
  }

  const time = series.fields.filter(field => field.name === 'Time')[0];
  const values = series.fields.filter(field => field.name === 'value')[0];
  const names = series.fields.filter(field => field.name === 'name')[0];

  const bars = [];
  for (let i = 0; i < series.fields[0].values.length; i++) {
    bars.push(new Bar(time.values.get(i), values.values.get(i), names ? names.values.get(i) : '', options.valueUnit))
  }

  const endTime = bars.map(bar => bar.endTime.unix()).reduce((a, b) => a > b ? a : b);

  bars.sort((a: Bar, b: Bar) => b.time.milliseconds() - a.time.milliseconds());

  const baseTime = bars[0].time.unix();
  const secondsFrame = endTime - baseTime;

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <svg
        className={styles.svg}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox={`0 0 ${width} ${height}`}
      >
        <g>
          {bars.map((bar, index) => {
            const step = height / bars.length - 2;
            const label = options.showInlineBarLabels ? <text x={(bar.time.unix() - baseTime) / secondsFrame * width} height={step} y={index * (step + 2) + step - 2} fontSize={`${Math.floor(step)}`} fill='#fff'>{bar.name} ({bar.value.asSeconds().toFixed(1)} sec)</text> : undefined
            return <g fill={fillColor}>
              <rect x={(bar.time.unix() - baseTime) / secondsFrame * width} height={step} y={index * (step + 2)} width={bar.value.asSeconds() / secondsFrame * width} stroke={color} strokeWidth='1' />
              {label}
            </g>;
          })}
        </g>
      </svg>
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});
