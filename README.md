# Task-Tracker-CLI

Sample solution for the [task-tracker](https://roadmap.sh/projects/task-tracker) challenge from [roadmap.sh](https://roadmap.sh/).

TaskTrackerCLI is a simple command-line tool for managing tasks. It is written in JavaScript.

## Features

- Add new tasks with a unique ID and store it in `JSON` format.
- List tasks by their status: `to-do`, `in-progress`, or `done`.
- Update the description of an existing task.
- Delete tasks by their ID.
- Delete all tasks.
- Mark tasks as `in-progress` or `done`.

## Prerequisites

- Node.js installed on your system.
- Git installed.

## Installation

To use Task-Tracker-CLI, first, clone the repository and then install the necessary dependencies. After that, you can use the npm link command to make the task-cli command available globally on your system.

```bash
git clone https://github.com/EtimbukUdofia/Task-tracker-cli-js
cd task-tracker-cli
npm install
npm install -g .
```

## Usage

### List all tasks

```
task-cli list
```

### List tasks by status
```
task-cli list {filter}
```

#### Example:

- To list all pending tasks (todo):
```
task-cli list todo
```

- To list all tasks in progress (in-progress):
```
task-cli list in-progress
```

- To list all completed tasks (done):
```
task-cli list done
```

### Create a task

```bash
task-cli add "Task description"
```
#### Example:

```bash
task-cli add "Task 1"
```


### Update a task

```bash
task-cli update "ID" "New task description"
```
#### Example:

```bash
task-cli update 1 "Updated Task 1"
```

### Update task status
- To mark a task as "in-progress", use:

```bash
task-cli mark-in-progress "ID"
```

- To mark a task as "done", use:
```bash
task-cli mark-done "ID"
```

#### Example:
```bash
# mark task as "in-progress"
task-cli mark-in-progress 1

#mark task as "done"
task-cli mark-done 1
```

### Delete a task

```bash
task-cli delete "ID"
```
#### Example:
```bash
task-cli delete 1
```

### Delete all tasks
```bash
task-cli delete all
```