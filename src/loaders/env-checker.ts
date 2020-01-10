const priority_envs = ["PORT"];

import config from "../config";

export default async function() {
  const missing = [];

  priority_envs.forEach(key => {
    if (!config.hasOwnProperty(key)) {
      missing.push(key);
    } else {
      // has property :: check for null
      if (config[key] == "" || config[key] === undefined) {
        throw new Error("Error in env/config value : " + key);
      }
    }
  });
  if (missing.length != 0) {
    // error
    throw new Error("Environment variables missing : " + missing);
  } else {
    // no missing and errors
    return true;
  }
}
