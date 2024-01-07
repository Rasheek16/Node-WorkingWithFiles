import fs from "fs";

const filename = "config.json";

function configParser(env) {
  return new Promise((resolve, reject) => {
    fs.open(filename, "r", (err, handle) => {
      // * OPENING  FILE WITH READ ONLY ACCESS , HANDLE IS USED TO ACCCESS THE CONTENTS
      fs.stat(filename, (err, stats) => {
        // *  READ INFO ABOUT THE CONFIG FILE
        const size = stats.size;
        const buffer = new Buffer.alloc(size); // * CREATE A NEW BUFFER OBJECT
        fs.read(handle, buffer, 0, size, 0, (err, bytes, content) => {
          // * TO WRITE TO BUFFER FROM LOCATION 0 AND FROM POSITION 0 OF THE FILE
          fs.close(handle, (err) => {
            const config = JSON.parse(content);
            if (config.hasOwnProperty(env)) {
              resolve(config[env]);
            } else {
              reject(`Section ${env} does not exist`);
            }
          });
        });
      });
    });
  });
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
