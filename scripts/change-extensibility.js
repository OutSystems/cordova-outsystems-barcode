if(!process.env.npm_config_plugin) {
    throw new Error("Missing plugin name.");
}

let pluginSpaceName = process.env.npm_config_plugin;
let metadata = process.env.npm_config_name;
let pluginForgeVersion = process.env.npm_config_forge
let mabsMin = process.env.npm_config_mabs;

let repository = process.env.npm_config_repository;
let branch = process.env.npm_config_branch;

let environment = process.env.npm_config_environment;

if(process.env.npm_config_authentication == null) {
    throw new Error("Missing authentication argument.");
}
let basicAuthentication = process.env.npm_config_authentication;

let url = "https://" + environment + "/CodeUpdater/rest/Bulk/ExtensabilityUpdate";

let extensibilityChangeJson = {
    plugin :{
        url: repository+"#"+branch,
    },
    metadata: { 
        "mabs-min": mabsMin ? mabsMin : "9.0.0",
        name: metadata, 
        version: pluginForgeVersion
    }
}

console.log(extensibilityChangeJson);
let extensibilityChangeString = JSON.stringify(extensibilityChangeJson);
let buffer = new Buffer.from(extensibilityChangeString);
let base64 = buffer.toString('base64');

let body = [{
    "ModuleName": pluginSpaceName,
    "Content": base64
}];

console.log(
    "Started changing extensibility in module " + pluginSpaceName + 
    ".\n -- Extensibility will be configured to: " + repository+"#"+branch +
    `\n with forge version ${pluginForgeVersion} and mabs min ${mabsMin}`  +
    "\nin environment:" + environment     
);



const response = fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: basicAuthentication
    },
    body: JSON.stringify(body), // body data type must match "Content-Type" header
  }).then((res) => {
        if(res.ok && res.status == 200)
            console.log("Successfully updated OML");
        else console.log(res)
    })



