# Waterfall panel

This panel is intended to visualize a single time series as a waterfall panel, e.g. to show dependencies between jobs
running in parallel in a build pipeline, or a series of HTTP requests.

![Image of a drawn panel](https://github.com/auxmoney/grafana-waterfall-panel/raw/main/src/img/auxmoney-waterfall-panel.png)

# Configuration

After installation, you can add a new panel type "Waterfall Panel" to your dashboards.

## Expected fields

The panel can only handle a single time series, and the time series can consist of these fields:

| field type | required | description         |
| ---------- | -------- | ------------------- |
| time       | yes      | starting point      |
| number     | yes      | duration in seconds |
| string     | no       | name                |

Make sure you select the fields of the time series as a "Table"!

The time frame will be calculated automatically and creates the panel frame. Each tuple will be represented by a bar in
the panel, starting at its "starting point" and taking up space relative to its "duration".

## Display configuration

* "Show inline bar labels" will show the labels inside the bars. The labels are populated from the string field.
  * "Show duration in bar labels" will show the duration in seconds inside the bars.
* "Bar color" is for changing the color of the bars.
* "Value Time Units" is currently hardcoded to "seconds", but will be expanded in future versions.

# Development

Please refer to the [development guide](https://github.com/auxmoney/grafana-waterfall-panel/blob/main/docs/DEVELOPMENT.md).

# Credits

* Icon made from <a href="http://www.onlinewebfonts.com/icon">Icon Fonts</a> is licensed by CC BY 3.0
