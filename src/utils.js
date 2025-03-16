const fs = require("fs");
const path = require("path");

const tasksPath = path.join(__dirname, "tasks.json");

const addTask = (description) => {
  try {
    let tasks = fs.existsSync(tasksPath)
      ? JSON.parse(fs.readFileSync(tasksPath))
      : [];

    // handle duplicate tasks
    const duplicateTask = tasks.find((task) => task.description.toLowerCase() === description.toLowerCase() && task.status === "todo");
    if (duplicateTask) {
      throw new Error(`A task already exists with that description`);
    }
    
    const newTask = {
      id: tasks[tasks.length - 1]?.id + 1 || 1,
      description,
      status: "todo",
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };

    tasks = [...tasks, newTask];

    fs.writeFileSync(tasksPath, JSON.stringify(tasks));
    // I might need to return something here for testing purposes
    console.log("Task added successfully", `ID: ${newTask.id}`);
    return newTask;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getTasks = (status) => {
  try {
    checkTasksFile();

    const tasks = JSON.parse(fs.readFileSync(tasksPath));

    if (status === "all") {
      if (tasks.length < 1) {
        throw new Error(`No tasks found`);
      }

      tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task.description} (ID: ${task.id})`);
      });
      return tasks;
    } else {
      const filteredTasks = tasks.filter((task) => task.status === status);

      if (filteredTasks.length < 1) {
        throw new Error(`No tasks found for status '${status}'`);
      } else {
        filteredTasks.forEach((task, index) => {
          console.log(`Your '${status}' tasks are: `);
          console.log(`${index + 1}. ${task.description} (ID: ${task.id})`);
        });

        return filteredTasks;
      }
    }
  } catch (error) {
    console.error("Error getting tasks", error);
    throw error;
  }
};

const updateTask = (id, option) => {
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
          if (option?.description) {
            task.description = option.description;
          } else if (option?.status) {
            task.status = option.status;
          } else {
            throw new Error("Error in updateTask: A description or status is needed");
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
    console.log(error);
    throw error;
  }
};

const deleteTask = (id) => {
  try {
    const taskId = Number(id);

    if (isNaN(taskId)) {
      throw new Error("ID must be a number");
    }

    checkTasksFile();

    const tasks = JSON.parse(fs.readFileSync(tasksPath));

    const taskToDelete = tasks.find((task) => task.id === taskId);

    if (taskToDelete) {
      const filteredTasks = tasks.filter((task) => task.id !== taskId);

      fs.writeFileSync(tasksPath, JSON.stringify(filteredTasks));

      console.log("Task deleted successfully");
    } else {
      throw new Error(`There is no task with the ID of ${taskId}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const checkTasksFile = () => {
  if (!fs.existsSync(tasksPath)) {
    throw new Error("No task currently in memory");
  }
};

module.exports = {
  addTask, getTasks, updateTask, deleteTask
};