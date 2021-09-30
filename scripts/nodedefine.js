function get(name){
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
       return decodeURIComponent(name[1]);
 }


var resp = {
    result: 0,
    ssl: !!jelastic.billing.account.GetQuotas('environment.jelasticssl.enabled').array[0].value,
    nodes: [{
      nodeType: "apache2",
      flexibleCloudlets: 16,
      fixedCloudlets: 1,
      diskLimit: 30,
      engine: "php7.4",
      nodeGroup: "cp",
      displayName: "Apps"
    },
    {
        nodeType: "postgres13",
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
        image: "onlyoffice/documentserver:"+get("DOCSRV_RV"),
        count: 1,
        flexibleCloudlets: 16,
        fixedCloudlets: 1,
        diskLimit: 10,
        nodeGroup: "onlyoffice",
        displayName: "Document Services"
    })
}

if (${settings.elastic:true}) {
    resp.nodes.push({
        image: "elasticsearch:"+get("ELS_RV"),
        count: 1,
        flexibleCloudlets: 16,
        fixedCloudlets: 1,
        diskLimit: 50,
        nodeGroup: "elastic",
        displayName: "Search Service"
    })
}


return resp;