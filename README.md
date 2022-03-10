# nconf-appconfig

[IBM Cloud App Configuration](https://cloud.ibm.com/docs/app-configuration?topic=app-configuration-getting-started) store for [nconf][0]

## Installation

### Installing npm (node package manager)
``` bash
  $ curl http://npmjs.org/install.sh | sh
```

### Installing nconf-appconfig
``` bash
  $ [sudo] npm install nconf
  $ [sudo] npm install nconf-appconfig
```

## Usage
The store provided by `nconf-appconfig` will persist all of your configuration settings to a IBM Cloud App Configuration server. All calls to `.get()` are asynchronous taking an additional callback parameter.

``` js
  var nconf = require('nconf');
  
  //
  // Requiring `nconf-appconfig` will extend the `nconf`
  // module.
  //
  require('nconf-appconfig');
  
  nconf.use('appconfig', { region: 'us-south', guid: 'guid', apikey: 'apikey', collectionId: 'collection', environmentId: 'dev' });
```

#### Author: Josephine Eskaline Joyce

[0]: https://github.com/jojustin/nconf-appconfig