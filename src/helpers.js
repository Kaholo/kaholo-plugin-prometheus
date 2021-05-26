const fetch = require("node-fetch");

async function sendToPrometheus(action, settings, httpMethod, path, body){
    let url = (action.  params.url || settings.url || "").trim();
    const user = (action.params.user || settings.user || "").trim();
    const pass = action.params.pass || settings.pass;

    if (!url){
        throw "Prometheus Server URL was not provided!";
    }
    const opts = {
        method: httpMethod,
        headers: new fetch.Headers()
    };
    if (user && pass){
        opts.headers.set('Authorization', 'Basic ' + Buffer.from(user + ":" + pass).toString('base64'));
    }
    if (httpMethod === "POST" && body){
        opts.body = JSON.stringify(body);
        opts.headers.set('Content-Type', 'application/json');
    }
    const res = await fetch(getApiUrl(url, path), opts);
    const resBody = await res.json();
    if (!res.ok || resBody.status !== "success"){
        throw resBody;
    }
    return resBody.data;
}

function getApiUrl(baseUrl, path){
    if (!baseUrl.endsWith("/")) baseUrl += "/";
    return `${baseUrl}api/v1/${path}`;
}

function parseLabels(param){
    if (!param) return {};
    if (typeof(param) === "object") return param;
    if (typeof(param) === "string"){
        const obj = {};
        param.split("\n").forEach(label => {
            let [key, ...value] = label.trim().split("=");
            if (!key || !value) {
                throw "Bad Labels Format";
            }
            if (Array.isArray(value)){
                value = value.join("=");
            }
            obj[key] = value;
        });
        return obj;
    }
    throw "Bad Labels Type";
}

module.exports = {
    sendToPrometheus,
    parseLabels
}
