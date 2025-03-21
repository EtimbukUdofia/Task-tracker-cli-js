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

```bash
git clone https://github.com/EtimbukUdofia/Task-tracker-cli-js
cd task-tracker-cli
npm install
npm install -g .
```

## Uninstallation
```bash
npm uninstall -g task-cli
```

## Usage
```bash
task-cli <command> [arguments]
```

### List all tasks

```bash
task-cli list
```

### List tasks by status
```bash
# To list the tasks that have todo status
task-cli list todo

# To list the tasks that have in-progress status
task-cli list in-progress

# To list the tasks that have done status
task-cli list done
```

### Create a task

```bash
task-cli add "Task description"
```

### Update a task

```bash
# To update the description of task with ID of 1 
task-cli update 1 "Updated Task 1"
```

### Update task status

```bash
# mark task with ID of 1 as "in-progress"
task-cli mark-in-progress 1

# mark task with ID of 1 as "done"
task-cli mark-done 1
```

### Delete a task

```bash
# delete task with ID 1
task-cli delete 1
```

### Delete all tasks
```bash
task-cli delete all
```

### Help
```bash
task-cli help
```