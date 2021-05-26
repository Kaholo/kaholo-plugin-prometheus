# kaholo-plugin-prometheus
Kaholo integration with Prometheus API

## Settings:
1. Prometheus Server URL (String) **Optional** - The full URL to your Prometheus default server.
2. Username (String) **Optional** - The username for your default user http basic authentication.
3. Password (Vault) **Optional** - The password for your default user http basic authentication.

* Please Notice! Username and Password are required only if you have some kind of external authentication service installed between you and your Prometheus Server - Which is not the default.

## Method: Get Alerts
This method returns all alerts from the Prometheus server. You can filter the alerts by their labels or by their state.

### Parameters:
1. Prometheus Server URL (String) **Optional** - The full URL to your Prometheus server.
2. Username (String) **Optional** - The username for http basic authentication.
3. Password (Vault) **Optional** - The password for http basic authentication. 
4. Labels (Text/Object) **Optional** - If specified, filter only the alerts that contains all labels specified. Each label needs to be in the format of key=value. You can enter multiple labels by seperating each label with a new line. You can also pass this parameter as an object, which fields represents labels.
5. State (Options) **Optional** - If specified, filter only the alerts that are in the state specified. Can be pending/firing/All. Default is All.

## Method: Get Rules
This method returns all alerting\recording rules from the Prometheus server. You can filter the rules by their type(alert\record) and by their rule group name.

### Parameters:
1. Prometheus Server URL (String) **Optional** - The full URL to your Prometheus server.
2. Username (String) **Optional** - The username for http basic authentication.
3. Password (Vault) **Optional** - The password for http basic authentication. 
4. Type (Options) **Optional** - If specified, filter only the rules from the type specified. Can be alert/record/All. Default is All.
5. Group Name Pattern (String) **Optional** - Either Group Name or Group Name [minimatch pattern](https://github.com/isaacs/minimatch#readme). If specified, filter only rules from Group Rules that match the Group Name Pattern.