#!/usr/bin/env node
const { addTask, getTasks, updateTask, deleteTask } = require("./utils.js");

// CLI logic
const args = process.argv.slice(2);
const command = args[0].toLowerCase();

switch (command) {
  case "add":
    if (args.length < 2) {
      console.log("The 'add' command needs a description");
      process.exit(1);
    }

    addTask(args[1]);
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
      console.log(error);
    }
    break;

  case "update":
    try {
      if (args.length < 3) {
        throw new Error("The 'update' command needs an id and a description");
      }

      updateTask(args[1], { description: args[2] });
    } catch (error) {
      console.log(error);
    }
    break;

  case "delete":
    try {
      if (args.length < 2) {
        throw new Error("The 'delete' command needs an id value");
      }

      deleteTask(args[1]);
    } catch (error) {
      console.log(error);
    }
    break;

  case "mark-in-progress":
    try {
      if (args.length < 2) {
        throw new Error("The 'mark-in-progress' command needs an id option");
      }

      updateTask(args[1], { status: "in-progress" });
    } catch (error) {
      console.log(error);
    }
    break;

  case "mark-done":
    try {
      if (args.length < 2) {
        throw new Error("The 'mark-done' command needs an id option");
      }

      updateTask(args[1], { status: "done" });
    } catch (error) {
      console.log(error);
    }
    break;

  // case "version":
  //   console.log(version);
  //   break;

  case "help":
    break;

  default:
    console.log(`<command> ${command} not found`);
    break;
}
