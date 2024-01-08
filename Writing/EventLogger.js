//* Importing necessary functions from the 'fs' (File System) module
import { appendFile, write, open, close } from "fs";

//* Importing the 'EventEmitter' class and 'format' function from the 'events' and 'util' modules respectively
import EventEmitter from "events";
import { format } from "util";

//* A custom class 'EventLogger' that extends 'EventEmitter'
class EventLogger extends EventEmitter {
  //* Constructor function that takes 'file' (log file) and 'levels' (log levels) as parameters
  constructor(file, levels) {
    //* Call the constructor of the parent class 'EventEmitter'
    super();

    //* Assigning 'file' and 'levels' properties to the instance
    this.file = file;
    this.levels = levels;

    //* Setting up event listeners for specific events and binding them to the 'log' method
    this.on("error", this.log.bind(this, "ERR"));
    this.on("warning", this.log.bind(this, "WARN"));
    this.on("info", this.log.bind(this, "INFO"));
  }

  //* Custom 'log' method to handle log events with specified log level and data
  log(level, data) {
    //* Check if the specified log level is included in the allowed log levels
    if (this.levels.indexOf(level) > -1) {
      //* Open the log file in append mode
      open(this.file, "a", (err, handle) => {
        //* Create a buffer with formatted log entry
        const buffer = Buffer.from(
          format("%s (%s) %s\n", new Date(), level, data)
        );

        //* Write the buffer to the log file
        write(handle, buffer, 0, buffer.length, null, (err, handle, buffer) => {
          //* Close the file handle after writing
          close(handle, () => {});
        });
      });
    }
  }
}

//* Creating an instance of the 'EventLogger' class with log file "error.log" and allowed log levels ["ERR", "WARN"]
const logger = new EventLogger("error.log", ["ERR", "WARN"]);

//* Emitting log events for demonstration
logger.emit("error", "Something happened");
logger.emit("warning", "Something else happened");
logger.emit("info", "Not relevant");

// * OR
// if (this.levels.indexOf(level) > -1) {
//   const logData = format("%s (%s) %s\n", new Date(), level, data);
//   appendFile(this.file, logData, () => {});
// }
