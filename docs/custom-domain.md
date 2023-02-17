# Activation d'un Custom domain + SSL Let'encrypt

- Retirer le RAGNAROKKR SSL dans la topologie
- Activer le Custom SSL dans la topologie
- Activer le plugin Let's encrypt sur le loadbalancer qui a été rajouté et y configurer le custom domain choisie.
- Dans la console SSH du node Apps lancer la commande suivante : 

```bash
cd /var/www/html
sudo -u www-data php -d  memory_limit=2048M occ config:system:set trusted_domains 0 --value="[CUSTOMDOMAIN]" --type=string
```

> Si l'installation à un Onlyoffice

- Déployer un nouveau Documentserver via le script [Manifest](https://raw.githubusercontent.com/hosteur-sa-ch/rag-hosteur-nexcloud/main/manifestoof.jps)
- test l'instalation en ouvrant l'url du docker, la page welcome doit apparaitre
- Dans NextCloud allez sur le compte compte admin, puis dans Settings > OnlyOffice et changer comme suis les configuration.

**Adresse du ONLYOFFICE Docs => https://URLDOCKER** 

**Advanced parameters > Adresse du ONLYOFFICE Docs pour les demandes internes du serveur => http://URLDOCKER**

- Sauvegarder la nouvelle configuration, celle-ci doit être valide.
- Tester d'ouvrir un fichier docx ou autre onlyoffice ddoit s'ouvrir correctement.

Vous pouvez maintenant retirer le précedent node Docker OnlyOffice (Document Servers) de l'environement NextCloud.