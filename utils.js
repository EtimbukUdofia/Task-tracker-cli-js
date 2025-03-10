import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tasksPath = path.join(__dirname, "tasks.json");

export const addTask = (description) => {
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

  // I might need to return something here for testing purposes
  // return newTask;
  console.log("Task added successfully", `ID: ${newTask.id}`);
}

export const getTasks = (status) => {
  try {
    checkTasksFile();

    const tasks = JSON.parse(fs.readFileSync(tasksPath));

    if (status === "all") {
      tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task.description}, (ID: ${task.id})`);
      })
    } else {
      const filteredTasks = tasks.filter((task) => task.status === status);

      if (filteredTasks.length < 1) {
        console.log(`You have no current '${status}' tasks.`)
      } else {
        filteredTasks.forEach((task, index) => {
          console.log(`Your '${status}' tasks are: `);
          console.log(`${index + 1}. ${task.description} (ID: ${task.id})`);
        })
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}

export const updateTask = (id, description = null, status = null) => {
  try {
    const taskId = Number(id);

    if (isNaN(taskId)) {
      throw new Error("ID must be a number");
    }

    checkTasksFile();
    
    const tasks = JSON.parse(fs.readFileSync(tasksPath));

    const taskToUpdate = tasks.find((task) => task.id === taskId);

    if (taskToUpdate) {
      tasks.forEach((task) => {
        if (task.id === taskId) {
          if (description) {
            task.description = description
          } else {
            task.status = status
          }
  
          task.updatedAt = new Date().toString();
        }
      });
    } else {
      throw new Error(`There is no task with the ID of ${taskId}`);
    }

    fs.writeFileSync(tasksPath, JSON.stringify(tasks));

    console.log("Task updated successfully");
  } catch (error) {
    console.log(error.message);
  }
}

const checkTasksFile = () => {
  if (!fs.existsSync(tasksPath)) {
    throw new Error("No task currently in memory");
  }
}