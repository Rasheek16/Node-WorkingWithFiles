import { readFile } from "fs";

const filename = "config.json";

function configParser(env) {
  return new Promise((resolve, reject) => {
    // * RETURNING NEW PROMISE
    readFile(filename, "utf-8", (error, content) => {
      //* READING FILE WITH ENCODING utf-8
      if (error) {
        reject(error);
      } else {
        const config = JSON.parse(content); //* CONVERTING TO JSON
        if (config.hasOwnProperty(env)) {
          //* CHECK FOR PROPERTY
          resolve(config[env]);
        } else {
          reject(`Section ${env} does not exist`);
        }
      }
    });
  });
}

configParser("production").then(
  (config) => console.log("PRODUCTION :", config),
  (err) => console.log(err)
);
configParser("development").then(
  (config) => console.log("DEVELOPMENT :", config),
  (err) => console.log(err)
);

configParser("test").catch((e) => {
  console.log(e);
});
