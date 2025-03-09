import { add } from "./utils.js";

// CLI logic
const arg = process.argv.slice(2);
const command = arg[0].toLowerCase();

switch (command) {
  case "add":
    if (arg.length < 2) {
      console.log("The 'add' command needs a description")
      process.exit(1);
    };

    add(arg[1]);

    break;
  
  case "list":
    break;
  
  case "update":
    break;
  
  case "delete":
    break;
  
  case "mark-in-progress":
    break;
  
  case "mark-done":
    break;
  
  case "help":
    break;

  default:
    console.log("command not found");
    break;
}