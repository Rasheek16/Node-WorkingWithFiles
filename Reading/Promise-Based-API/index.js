//* Importing the 'readFile' function from the 'fs/promises' module for asynchronous file reading
import { readFile } from "fs/promises";

//* Defining the file name to be read
const fileName = "config.json";

//* Asynchronous function to parse configuration based on the environment
async function configParser(env) {
  //* Reading the content of the file with UTF-8 encoding
  const content = await readFile(fileName, "utf-8");

  //* Parsing the content as JSON
  const config = JSON.parse(content);

  //* Checking if the specified environment property exists in the configuration
  if (config.hasOwnProperty(env)) {
    //* Returning the configuration for the specified environment
    return config[env];
  } else {
    //* Throwing an error if the specified environment property does not exist
    throw new Error(`Section ${env} does not exist`);
  }
}

//* Using the configParser function to get the configuration for the "production" environment
configParser("production").then((config) =>
  console.log("PRODUCTION :", config)
);

//* Using the configParser function to get the configuration for the "development" environment
configParser("development").then((config) =>
  console.log("DEVELOPMENT :", config)
);

//* Using the configParser function to get the configuration for the "test" environment
configParser("test").catch((e) => {
  //* Catching and logging any errors that occur during the process
  console.log(e);
});
