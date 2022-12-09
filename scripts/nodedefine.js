var resp = {
    result: 0,
    ssl: !!jelastic.billing.account.GetQuotas('environment.jelasticssl.enabled').array[0].value,
    nodes: [{
        nodeType: "postgres14",
        flexibleCloudlets: 24,
        fixedCloudlets: 12,
        diskLimit: 50,
        nodeGroup: "sqldb",
        displayName: "Database"
    },
    {
        nodeType: "redis",
        flexibleCloudlets: 8,
        fixedCloudlets: 1,
        diskLimit: 10,
        nodeGroup: "nosqldb",
        displayName: "Sessions"
    }]
  }

if (${settings.onlyoff:true}) {
    resp.nodes.push({
        image: "onlyoffice/documentserver:6.4.1",
        count: 1,
        flexibleCloudlets: 16,
        fixedCloudlets: 1,
        diskLimit: 10,
        nodeGroup: "onlyoffice",
        displayName: "Document Services"
    })
    resp.nodes.push({
        image: "nextcloud:production-apache",
        flexibleCloudlets: 16,
        fixedCloudlets: 1,
        diskLimit: 30,
        engine: "php7.4",
        nodeGroup: "cp",
        displayName: "Apps",
        links: {
            sourceNodeGroup: "onlyoffice",
            alias: "onlyoffice"
            }
    })
} 
else 
{
    resp.nodes.push({
        image: "nextcloud:production-apache",
        flexibleCloudlets: 16,
        fixedCloudlets: 1,
        diskLimit: 30,
        nodeGroup: "cp",
        displayName: "Apps",
    })
}

if (${settings.elastic:true}) {
    resp.nodes.push({
        image: "elasticsearch:7.17.5",
        count: 1,
        flexibleCloudlets: 16,
        fixedCloudlets: 1,
        diskLimit: 50,
        nodeGroup: "elastic",
        displayName: "Search Service"
    })
}
return resp;