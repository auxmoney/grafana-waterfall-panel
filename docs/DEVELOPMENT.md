# Local Development

- checkout from github
- install [nodejs 12](https://nodejs.org/en/download/)
- install [yarn](https://classic.yarnpkg.com/en/docs/install)
- install [docker](https://docs.docker.com/get-docker/)
- run `yarn install`
- run `yarn build`
- run `yarn run watch`
- start local grafana `docker run -d -p 3000:3000 -v "$(pwd)":/var/lib/grafana/plugins/grafana-waterfall-panel --name=grafana grafana/grafana`
  - for grafana 8, you need to add `allow_loading_unsigned_plugins = auxmoney-waterfall-panel` to your `grafana.ini`
- login in your browser on localhost:3000 (default password and user is _admin_)
- add suitable datasource


# pre-publish flight check

Use [plugin validator](https://github.com/grafana/plugin-validator) to check your changes. 

# releasing, signing and listing

Releasing and signing happens automatically after a merge into `main` through Github workflows.

A separate PR must be created to list the newest version in the official [Grafana plugin repository](https://github.com/grafana/grafana-plugin-repository/).
Simply add a new `version` under the `versions` array in the plugin object identified by `"id": "auxmoney-waterfall-panel"`.
