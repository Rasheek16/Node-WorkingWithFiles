//* Importing the 'fs' module for file system operations
import fs from "fs";

//* Class definition for the Explorer
class Explorer {
  //* Constructor method for initializing the Explorer object
  constructor() {
    //* Resuming the input stream
    process.stdin.resume();

    //* Setting the encoding for the input stream
    process.stdin.setEncoding("utf-8");

    //* Listening for data events on the input stream and binding the 'dispatch' method to handle input
    process.stdin.on("data", this.dispatch.bind(this));
  }

  //* Method to handle user input and perform corresponding actions
  dispatch(chunk) {
    //* Using a regular expression to parse the input into a command and a path
    const result = chunk.match(/(\w*) (.*)/);
    let command = "";
    let path = "";

    //* Checking if the regular expression matched successfully
    if (result !== null) {
      //* Extracting the command and path from the matched result
      command = result[1];
      path = result[2];
    }

    //* Switch statement to determine the action based on the command
    switch (command) {
      //* Case for 'list' command
      case "list":
        this.display(path);
        break;

      //* Case for 'change' command
      case "change":
        process.chdir(path);
        this.listCurrent();
        break;

      //* Case for 'file' command
      case "file":
        //* Writing an empty file and calling 'listCurrent' when done
        fs.writeFile(path, "", this.listCurrent.bind(this));
        break;

      //* Case for 'remove' command
      case "remove":
        //* Checking if the path is a file or directory and performing the appropriate action
        fs.stat(path, (err, stat) => {
          if (stat.isFile()) {
            fs.unlink(path, this.listCurrent.bind(this)); //* Removing file
          } else if (stat.isDirectory()) {
            fs.rmdir(path, this.listCurrent.bind(this)); //* Removing directory
          }
        });
        break;

      //* Case for 'directory' command
      case "directory":
        //* Creating a directory and calling 'listCurrent' when done
        fs.mkdir(path, this.listCurrent.bind(this));
        break;

      //* Case for 'rename' command
      case "rename":
        //* Splitting the path into two parts and renaming the file or directory
        const paths = path.split(" ");
        fs.rename(paths[0], paths[1], this.listCurrent.bind(this));
        break;

      //* Default case for unknown commands
      default:
        process.exit(); //* Exiting the program
    }
  }

  //* Method to list the current directory
  listCurrent() {
    this.dispatch(`list ${process.cwd()}`);
  }

  //* Method to display the contents of a directory
  display(path) {
    console.log(`Current working directory: ${process.cwd()}`);

    //* Reading the contents of the specified directory
    fs.readdir(path, (err, files) => {
      let result = "";
      for (let i = 0; i < files.length; i++) {
        result += files[i] + "\t";
        if ((i + 1) % 4 === 0) {
          result += "\n";
        }
      }

      //* Logging the result (directory contents)
      console.log(result);
    });
  }
}

//* Creating an instance of the Explorer class
const explorer = new Explorer();

//* Listing the current directory
explorer.listCurrent();
