# Project todo list

* [ ] Add trusted domain for onlyoffice and test it.
* [X] Do Encryption setup
* [ ] Create Addon for Update/Upgrade 
* [X] Add correct crontab
```
#crontab -e
*/5 * * * * sudo -u www-data php -d memory_limit=4096M -f /var/www/html/cron.php
```

