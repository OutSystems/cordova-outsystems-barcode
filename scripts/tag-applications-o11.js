async function getEnvironmentKey(base, env, auth){
    let url =  `${base}/environments`;
    
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: auth
        }
    })

    if(response.ok && response.status == 200){
        let list = await response.json();
        return (list.filter((detail) => detail.Name == env)[0]).Key
    }

    console.log(response.status)
    let answer  = await response.text()
    console.log(answer)
    throw Error("Couldn't get environment key. Please check logs for more info.")

}

async function getAppKey(base, pluginSpaceName, auth){
    let url =  `${base}/applications?IncludeEnvStatus=true`;
    
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: auth
        }
    })
    
    if(response.ok && response.status == 200){
        let list = await response.json();
        
        let app = list.filter((a) => a.Name == pluginSpaceName)[0];
        return app.Key
    }
}

async function getModules(base, pluginKey, inEnv, auth){
    let url =  `${base}/environments/${inEnv}/applications/${pluginKey}?IncludeEnvStatus=true&IncludeModules=true`;
    
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: auth
        }
    })
    
    if(response.ok && response.status == 200){
        let app = await response.json();
        return app.AppStatusInEnvs[0].ModuleStatusInEnvs.map((m) => m.ModuleVersionKey )
    }
}


async function getLatestAppVersion(base, appKey, auth) {
    let url =  `${base}/applications/${appKey}/versions`;
    
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: auth
        }
    })

    if(response.ok && response.status == 200){
        let list = await response.json();
        
        if(list.length > 0)
            return list[0].Version;
        return '1.0.0';
    }
}

async function createVersion(base, appKey, inEnv, version, modules, auth){
    let url =  `${base}/environments/${inEnv}/applications/${appKey}/versions`;
    let body = {
        ChangeLog: "New version created by github action",
        Version: version,
        MobileVersions: [],
        ModuleVersionKeys: modules
        
    }
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: auth
        },
        body: JSON.stringify(body)
    })

    if(response.ok && response.status == 201){
       let res = await response.json();
       return res.ApplicationVersionKey;
    } 
    
    console.log(response.status)
    let answer  = await response.text()
    console.log(answer)
    throw Error("Coulnd't tag application.")


}

async function tagApp(baseURL, pluginSpaceName, auth){
    let fromKey = await getEnvironmentKey(baseURL, "Development", auth);
    let pluginKey = await getAppKey(baseURL, pluginSpaceName, auth);
    console.log(`plugin key: ${pluginKey}`);

    let modules = await getModules(baseURL, pluginKey, fromKey, auth);
    console.log(modules)

    let version = await getLatestAppVersion(baseURL,pluginKey, auth);
    console.log(`last tagged version: ${version}`);

    let [_, major, minor, patch] = version.match(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/) ?? []; 
    let newVersion = `${major}.${minor}.${parseInt(patch) + 1}`;
    console.log(`next version: ${newVersion}`);
    
    let appKey = await createVersion(baseURL, pluginKey, fromKey, newVersion, modules, auth);
    console.log(`new plugin version tag created, app key is ${appKey}`)
}



if(process.env.npm_config_authentication == null) {
    throw new Error("Missing authentication argument");
}

let pluginSpaceName = process.env.npm_config_plugin;
let authentication = process.env.npm_config_authentication;
let baseURL = process.env.npm_config_lifetime;

baseURL = `https://${baseURL}/lifetimeapi/rest/v2`;

tagApp(baseURL, pluginSpaceName, authentication);


