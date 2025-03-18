#!/usr/bin/env node
const readline = require("readline");
const { addTask, getTasks, updateTask, deleteTask } = require("./utils.js");

// CLI logic
const args = process.argv.slice(2);
const command = args[0].toLowerCase();

switch (command) {
  case "add":
    try {
      if (args.length < 2) {
        throw new Error("The 'add' command needs a description");
      }
  
      addTask(args[1]);
    } catch (error) {
      console.log(error.message);
    }
    break;

  case "list":
    try {
      if (args.length === 1 || args[1] === "all") {
        getTasks("all");
        process.exit(0);
      }

      if (!["done", "todo", "in-progress"].includes(args[1])) {
        throw new Error(
          "Invalid option provided to the 'list' command. valid options include: 'todo', 'done', 'in-progress'"
        );
      }

      getTasks(args[1]);
    } catch (error) {
      console.log(error.message);
    }
    break;

  case "update":
    try {
      if (args.length < 3) {
        throw new Error("The 'update' command needs an id and a description");
      }

      updateTask(args[1], { description: args[2] });
    } catch (error) {
      console.log(error.message);
    }
    break;

  case "delete":
    try {
      if (args.length < 2) {
        throw new Error(
          "The 'delete' command needs an 'id' value or delete all tasks with the 'all' option"
        );
      }
      
      if (args[1] === "all") {
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        rl.question(
          `Are you sure you want to delete all your tasks? (Y/n): `,
          (answer) => {
            if (answer === "" || answer.toLowerCase() === "y") {
              deleteTask("all");
            } else if (answer.toLowerCase() === "n") {
              console.log("Deletion cancelled");
            } else {
              console.log(
                `Unknown command: '${answer}'. Enter either 'y' or 'n'`
              );
            }
            rl.close();
          }
        );
      } else {
        deleteTask(args[1]);
      }
    } catch (error) {
      console.log(error.message);
    }
    break;

  case "mark-in-progress":
    try {
      if (args.length < 2) {
        throw new Error("The 'mark-in-progress' command needs an id option");
      }

      updateTask(args[1], { status: "in-progress" });
    } catch (error) {
      console.log(error.message);
    }
    break;

  case "mark-done":
    try {
      if (args.length < 2) {
        throw new Error("The 'mark-done' command needs an id option");
      }

      updateTask(args[1], { status: "done" });
    } catch (error) {
      console.log(error.message);
    }
    break;

  case "help":
    break;

  default:
    console.log(`<command> ${command} not found`);
    break;
}
