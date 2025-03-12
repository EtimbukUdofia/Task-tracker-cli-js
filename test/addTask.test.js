const { addTask } = require("../src/utils.js");

test("can add a task", () => {
  const task = addTask("Test task");

  expect(task).toHaveProperty('id');
  expect(task).toHaveProperty('description', 'Test task');
  expect(task).toHaveProperty('status', 'todo');
  expect(task).toHaveProperty('createdAt');
  expect(task).toHaveProperty('updatedAt');

  // to ensure createdAt and updatedAt are strings
  expect(typeof task.createdAt).toBe('string');
  expect(typeof task.updatedAt).toBe('string');

  // ensure createdAt and updatedAt are valid date strings
  expect(new Date(task.createdAt).toString()).not.toBe('Invalid Date');
  expect(new Date(task.updatedAt).toString()).not.toBe('Invalid Date');
});
