import { constants } from "fs";
import { stat, access } from "fs/promises";

// try {
//   const fileStat = await stat("./input.txt");  // * CHECK EXISTANCE
//   console.log(fileStat);                       
// } catch (error) {}                             
  
try {
  await access("./input.txt", constants.R_OK);   // * CHECK ACCESS
  console.log("File is readable");
} catch (error) {
  console.log("File not readable");
}
