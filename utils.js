import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tasksPath = path.join(__dirname, "tasks.json");

export const add = (description) => {
  let tasks = fs.existsSync(tasksPath) ? JSON.parse(fs.readFileSync(tasksPath)) : [];
  const newTask = {
    id: tasks[tasks.length - 1]?.id + 1 || 0,
    description,
    status: "todo",
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
  };

  tasks = [...tasks, newTask];
  try {
    fs.writeFileSync(tasksPath, JSON.stringify(tasks));
  } catch (error) {
    console.log(err);
  }

  console.log("Task added successfully");
}