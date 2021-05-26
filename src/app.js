const { sendToPrometheus, parseLabels } = require("./helpers");
const minimatch = require("minimatch");

async function getAlerts(action, settings) {
    let alerts = (await sendToPrometheus(action, settings, "GET", `alerts`)).alerts;
    const labels = parseLabels(action.params.labels);
    const state = action.params.state || "All";
    if (Object.keys(labels).length > 0){
        // if alers specified, check they are all included
        alerts = alerts.filter(alert => Object.entries(labels).every(([key, val]) => {
            return alert.labels.hasOwnProperty(key) && alert.labels[key] === val;
        }))
    }
    if (state !== "All"){
        alerts = alerts.filter(alert => alert.state === state);
    }
    return alerts;
}

async function getRules(action, settings) {
    const ruleTypes = action.params.type || "All";
    const path = `rules${ruleTypes !== "All" ? `?type=${ruleTypes}` : ""}`;
    let groups = (await sendToPrometheus(action, settings, "GET", path)).groups;

    const groupNamePat = (action.params.groupNamePat || "").trim();
    if (groupNamePat){
        groups = groups.filter(group => minimatch(group.name, groupNamePat));
    }
    return groups;
}

///// Exports

module.exports = {
    getAlerts,
    getRules
}
