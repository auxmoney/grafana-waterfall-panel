# Waterfall panel

This panel is intended to visualize a single time series as a waterfall panel, e.g. to show dependencies between jobs
running in parallel in a build pipeline or a series of HTTP requests.

# Installation


# Local Development
  - checkout from github
  - install [nodejs 12](https://nodejs.org/en/download/)
  - install [yarn](https://classic.yarnpkg.com/en/docs/install)
  - install [docker](https://docs.docker.com/get-docker/)
  - run `yarn install`
  - run `yarn build`
  - run `yarn run watch`
  - start local grafana `docker run -d -p 3000:3000 -v "$(pwd)":/var/lib/grafana/plugins/grafana-waterfall-panel --name=grafana grafana/grafana:7.0.0`
  - login in your browser on localhost:3000 (default password and user is _admin_)
  - add suitable datasource

# Credits

* Icon made from <a href="http://www.onlinewebfonts.com/icon">Icon Fonts</a> is licensed by CC BY 3.0
