import { addTask, getTasks } from "./utils.js";

// CLI logic
const args = process.argv.slice(2);
const command = args[0].toLowerCase();

switch (command) {
  case "add":
    if (args.length < 2) {
      console.log("The 'add' command needs a description")
      process.exit(1);
    };

    addTask(args[1]);
    break;
  
  case "list":
    if (args.length === 1 || args[1] === "all") {
      getTasks("all");
      process.exit(0);
    }

    if (!["done", "todo", "in-progress"].includes(args[1])) {
      console.log(
        "Invalid option provided to the 'list' command. valid options include: 'todo', 'done', 'in-progress'"
      );
      process.exit(9); // change to (1) later
    };

    getTasks(args[1]);

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