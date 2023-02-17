# Install Only Office with Custom domain

1. Add new Environement with Docker Image of only office 
2. Activate Shared SSL
3. Install App OnlyOffice on NextCloud (if not already installed)
4. Configure on NextCloud with https url for External OnlyOffice server and http for local or use command line below

```bash
sudo -u www-data php -d  memory_limit=2048M occ config:system:set onlyoffice DocumentServerUrl --value="https://ONLYOFFICE_ENV_FQDN" --type=string
sudo -u www-data php -d  memory_limit=2048M occ config:system:set onlyoffice DocumentServerInternalUrl --value="http://ONLYOFFICE_ENV_FQDN" --type=string
sudo -u www-data php -d  memory_limit=2048M occ config:system:set onlyoffice StorageUrl --value="http://NEXTCLOUD_ENV_FQDN" --type=string
sudo -u www-data php -d  memory_limit=2048M occ config:system:set trusted_domains 3 --value="ONLYOFFICE_ENV_FQDN" --type=string
sudo -u www-data php -d  memory_limit=2048M occ config:system:set allow_local_remote_servers --value="true" --type=boolean
```

If OnlyOffice is already installed from template remove the Node OnlyOffice from NextCloud environment.
