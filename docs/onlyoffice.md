# Install Only Office with Custom domain

1. Add new Environement with Docker Image of only office (v7.3.2)
2. Activate Shared SSL
3. Install App OnlyOffice on NextCloud (if not already installed)
4. Restart OnlyOffice Environemment
5. Configure on NextCloud with https url for External OnlyOffice server and http for local or use command line below

```bash
sudo -u www-data php -d  memory_limit=2048M occ config:system:set onlyoffice DocumentServerUrl --value="https://ONLYOFFICE_ENV_FQDN" --type=string
sudo -u www-data php -d  memory_limit=2048M occ config:system:set onlyoffice DocumentServerInternalUrl --value="http://ONLYOFFICE_ENV_FQDN" --type=string
sudo -u www-data php -d  memory_limit=2048M occ config:system:set onlyoffice StorageUrl --value="http://NEXTCLOUD_ENV_FQDN" --type=string
sudo -u www-data php -d  memory_limit=2048M occ config:system:set trusted_domains 3 --value="ONLYOFFICE_ENV_FQDN" --type=string
sudo -u www-data php -d  memory_limit=2048M occ config:system:set allow_local_remote_servers --value="true" --type=boolean
```
6. Add to the config.php (NextCloud)
```
  array (
    'DocumentServerUrl' => 'https://ONLYOFFICE_ENV_FQDN',
    'DocumentServerInternalUrl' => 'http://ONLYOFFICE_ENV_FQDN',
    'StorageUrl' => 'http://NEXTCLOUD_ENV_FQDN',
    'verify_peer_off' => true,
    'jwt_secret' => 'ASecretPhrase',
    'jwt_header' => 'AuthorizationJWT'
  ),
```
7. On OnlyOffice Image edit /etc/onlyoffice/documentserver/local.json and change the configuration like below

```
{
  "services": {
    "CoAuthoring": {
      "sql": {
        "type": "postgres",
        "dbHost": "localhost",
        "dbPort": "5432",
        "dbName": "onlyoffice",
        "dbUser": "onlyoffice",
        "dbPass": "onlyoffice"
      },
      "token": {
        "enable": {
          "request": {
            "inbox": true,
            "outbox": true
          },
          "browser": true
        },
        "inbox": {
          "header": "AuthorizationJWT",
          "inBody": false
        },
        "outbox": {
          "header": "AuthorizationJWT",
          "inBody": false
        }
      },
      "secret": {
        "inbox": {
          "string": "ASecretPhrase"
        },
        "outbox": {
          "string": "ASecretPhrase"
        },
        "session": {
          "string": "ASecretPhrase"
        }
      }
    }
  },
  "rabbitmq": {
    "url": "amqp://guest:guest@localhost"
  },
  "storage": {
    "fs": {
      "secretString": "FSSercret"
    }
  }
}
```
8. Restart OnlyOffice Service
```
supervisorctl restart all
```
9. Go to Admin Seting (NextCloud) in Onlyoffice and validate the configuration
>To Check if install is okey by command line
```
 sudo -u www-data php -d  memory_limit=2048M occ onlyoffice:documentserver --check
```
10. Remove old OnlyOffice Image from NextCloud env.