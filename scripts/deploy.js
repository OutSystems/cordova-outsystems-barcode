
if(process.env.npm_config_from == null || process.env.npm_config_to == null) {
    throw new Error("Missing repositoryURL, branch, environment arguments");
}

if(process.env.npm_config_authentication == null) {
    throw new Error("Missing authentication argument");
}

let pluginSpaceName = process.env.npm_config_plugin;
let fromEnvironment = process.env.npm_config_from;
let toEnvironment = process.env.npm_config_to;
let basicAuthentication = process.env.npm_config_authentication;
let baseURL = process.env.npm_config_lifetime;

baseURL = `https://${baseURL}/lifetimeapi/rest/v2`;

startDeploy(baseURL, fromEnvironment, toEnvironment, pluginSpaceName, basicAuthentication);

async function startDeploy(baseURL, fromEnvironment, toEnvironment, pluginSpaceName, auth){
   let fromKey = await getEnvironmentKey(baseURL, fromEnvironment, auth);
   let toKey = await getEnvironmentKey(baseURL, toEnvironment, auth);

   let pluginKey = await getAppKey(baseURL, pluginSpaceName, fromKey, auth)

   let deploymentKey = createDeploymentPlan(baseURL, fromKey, toKey, pluginKey, auth);

   //TODO: check for conflicts + slack message for approval if conflicts were found
   await startDeployment(baseURL, deploymentKey, auth);

   while(!isFinished(baseURL, deploymentKey, basicAuthentication)){
        //we wait until it's finished
        sleep(5000);
   }

}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

async function getEnvironmentKey(base, env, auth){
    let url =  `${base}/environments`;
    
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: auth
        }
    })

    if(response.ok && response.status == 200){
        let list = await response.json();
        return list.filter((detail) => detail.EnvironmentType == env)[0]
    }
}

async function getAppKey(base, pluginSpaceName, inEnv, auth){
    let url =  `${base}/applicationss?IncludeEnvStatus=true`;
    
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: auth
        }
    })

    if(response.ok && response.status == 200){
        let list = await response.json();
        let app = list.filter((a) => a.name == pluginSpaceName);
        return app.AppStatusInEnvs.filter((status) => status.EnvironmentKey == inEnv)[0]
    }
}

async function createDeploymentPlan(base, fromEnv, toEnv, pluginKey, auth) {
	let url =  `${base}/deployments`
	let body = {
        Notes: "Deployment triggered by github workflow",
	    SourceEnvironmentKey: fromEnv,
	    TargetEnvironmentKey: toEnv,
	    ApplicationOperations:[
            {
                ApplicationVersionKey: pluginKey
            }
        ] 
	};

    const response = await fetch(url, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            Authorization: auth
        },
        body: JSON.stringify(body)
    })
    console.log(response)
    
    if(response.ok && response.status == 200){
        let res = await response.json()
        console.log("Deployment Response:" + res);
        return response.json();
    }
}

async function startDeployment(base, deployKey, auth){
    let url =  `${base}/deployments/${deployKey}/start`
	
    const response = await fetch(url, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            Authorization: auth
        }
    })
    console.log(response)
    
    if(response.ok && response.status == 202){
        console.log("Deployment Started Successfully!");   
    }
}

async function isFinished(base, deployKey, auth) {
    let url = `${base}/deployments/${deployKey}/status`;

    let res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: auth
        }
    })
    
    if(res.ok && res.status == 200){
        let status = await res.json()
        if(status.DeploymentStatus == 'running'){
            console.log("Still running...");
            return false
        } 
        if(status.DeploymentStatus == 'aborted'){
            
            throw Error ("!! Deployment aborted !!");
        }
        if(status.DeploymentStatus == 'finished_with_errors'){
            throw Error ("!! Something went wrong with the deployment: finished with errors. Please check lifetime !!");
        }

        if(status.DeploymentStatus == 'finished_with_warnings'){
            console.log("Finished with warnings");
            return true
        }
        if(status.DeploymentStatus == 'finished_successful'){
            console.log("Finished with warnings");
            return true
        }
        
    }
    throw Error ("!! Something went wrong with the request: " + await res.json());
}
