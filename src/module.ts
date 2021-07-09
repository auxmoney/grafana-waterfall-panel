import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { WaterfallPanel } from './WaterfallPanel';

export const plugin = new PanelPlugin<SimpleOptions>(WaterfallPanel).setPanelOptions((builder) => {
  return builder
    .addBooleanSwitch({
      path: 'showInlineBarLabels',
      name: 'Show inline bar labels',
      defaultValue: false,
    })
    .addBooleanSwitch({
      path: 'showDurationInLabels',
      name: 'Show duration in bar labels',
      defaultValue: true,
      showIf: (config) => config.showInlineBarLabels,
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
          {
            value: 'blue',
            label: 'Blue',
          },
        ],
      },
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
      },
    });
});
