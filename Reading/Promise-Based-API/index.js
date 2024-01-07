import { readFile } from "fs/promises";

const fileName = "config.json";
async function configParser(env) {
  const content = await readFile(fileName, "utf-8"); //* READING FILE WITH ENCODING utf-8
  const config = JSON.parse(content); //* CONVERTING TO JSON
  if (config.hasOwnProperty(env)) {
    //* CHECK FOR PROPERTY
    return config[env];
  } else {
    throw new Error(`Section ${env} does not exist`);
  }
}

configParser("production").then((config) =>
  console.log("PRODUCTION :", config)
);
configParser("development").then((config) =>
  console.log("DEVELOPMENT :", config)
);

configParser("test").catch((e) => {
  console.log(e);
});
