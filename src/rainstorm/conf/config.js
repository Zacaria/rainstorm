module.exports = {
  apiKeyClient: 'apikeyclient',
  apiKeyRetaliation: 'apikeyretaliation',
  mode: 'standalone', // Valid modes are standalone and slave
  port: 3001,
  master: {
    host: '192.168.10.52',
    scheme: 'http',
    port: 3000
  }
}
