import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(builder => {
  return builder
    .addBooleanSwitch({
      path: 'showInlineBarLabels',
      name: 'Show inline bar labels',
      defaultValue: false,
    })
    .addRadio({
      path: 'seriesCountSize',
      defaultValue: 'sm',
      name: 'Series counter size',
      settings: {
        options: [
          {
            value: 'sm',
            label: 'Small',
          },
          {
            value: 'md',
            label: 'Medium',
          },
          {
            value: 'lg',
            label: 'Large',
          },
        ],
      },
      showIf: config => config.showInlineBarLabels,
    })
    .addRadio({
      path: 'color',
      name: 'Bar color',
      defaultValue: 'red',
      settings: {
        options: [
          {
            value: 'red',
            label: 'Red',
          },
          {
            value: 'green',
            label: 'Green',
          },
        ],
      }
    })
    .addRadio({
      path: 'valueUnit',
      name: 'Value Time Unit',
      defaultValue: 's',
      settings: {
        options: [
          {
            value: 's',
            label: 'seconds (s)',
          },
        ],
      }
    });
});
