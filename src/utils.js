const fs = require("fs");
const path = require("path");

const tasksPath = path.join(__dirname, "tasks.json");

const addTask = (description) => {
  try {
    let tasks = fs.existsSync(tasksPath)
      ? JSON.parse(fs.readFileSync(tasksPath))
      : [];

    description = description.replace(/(\r\n|\n|\r)/gm, ""); // removes line breaks from text

    // handle duplicate tasks
    const duplicateTask = tasks.find(
      (task) =>
        task.description.toLowerCase() === description.toLowerCase() &&
        task.status === "todo"
    );
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
    throw error;
  }
};

const updateTask = (id, option) => {
  try {
    const taskId = Number(id);
    let updatedTask;

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
            throw new Error("A description or status is needed");
          }

          task.updatedAt = new Date().toString();
          updatedTask = task;
        }
      });
    } else {
      throw new Error(`There is no task with the ID of ${taskId}`);
    }

    fs.writeFileSync(tasksPath, JSON.stringify(tasks));
    console.log("Task updated successfully");

    return updatedTask;
  } catch (error) {
    throw error;
  }
};

const deleteTask = (option) => {
  try {
    if (option !== "all") {
      const taskId = Number(option);

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
        return taskToDelete;
      } else {
        throw new Error(`There is no task with the ID of ${taskId}`);
      }
    } else {
      checkTasksFile();
      const tasks = JSON.parse(fs.readFileSync(tasksPath));

      if (tasks.length === 0) {
        throw new Error("No task currently in memory");
      }

      fs.writeFileSync(tasksPath, JSON.stringify([]));
      console.log("All tasks deleted successfully");
    }
  } catch (error) {
    throw error;
  }
};

const checkTasksFile = () => {
  if (!fs.existsSync(tasksPath)) {
    throw new Error("No task currently in memory");
  }
};

const displayHelp = () => {
  console.log(`
    Usage: task-cli <command>

    Commands:
      help                    Show help information

      add [desc]              Adds task with provided description

      list                    Lists all tasks

      list all                Lists all tasks

      list [status]           Lists all tasks with the corresponding status (todo, in-progress, done)

      update [id] [desc]      Updates the description of the task with corresponding id

      mark-in-progress [id]   Updates the status of the task with corresponding id to "in-progress"

      mark-done [id]          Updates the status of the task with corresponding id to "done"

      delete [id]             Deletes the task with the provided task id

      delete all              Deletes all tasks
  `);
};

module.exports = {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  displayHelp,
};
