import moment from 'moment'; // eslint-disable-line no-restricted-imports

type SeriesSize = 'sm' | 'md' | 'lg';

type CircleColor = 'red' | 'green' | 'blue';

export interface SimpleOptions {
  text: string;
  showInlineBarLabels: boolean;
  seriesCountSize: SeriesSize;
  color: CircleColor;
  valueUnit: moment.unitOfTime.Base;
}
