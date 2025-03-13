const fs = require("fs");
const { getTasks } = require("../src/utils.js");

jest.mock("fs"); // Mock file system

describe("getTasks function", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  test('should log and return all tasks when status is "all"', () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const mockTasks = [
      { id: 1, description: "Task 1", status: "todo" },
      { id: 2, description: "Task 2", status: "done" },
      { id: 3, description: "Task 3", status: "in-progress" },
    ];

    fs.readFileSync.mockReturnValue(JSON.stringify(mockTasks));
    fs.existsSync.mockReturnValue(true);

    const result = getTasks("all");

    expect(result).toEqual(mockTasks);
    expect(consoleSpy).toHaveBeenCalledWith("1. Task 1 (ID: 1)");
    expect(consoleSpy).toHaveBeenCalledWith("2. Task 2 (ID: 2)");
    expect(consoleSpy).toHaveBeenCalledWith("3. Task 3 (ID: 3)");

    consoleSpy.mockRestore();
  });

  test('should log and return "todo" tasks', () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const mockTasks = [
      { id: 1, description: "Task 1", status: "todo" },
      { id: 2, description: "Task 2", status: "done" },
    ];

    fs.readFileSync.mockReturnValue(JSON.stringify(mockTasks));

    const result = getTasks("todo");

    expect(result).toEqual([{ id: 1, description: "Task 1", status: "todo" }]);
    expect(consoleSpy).toHaveBeenCalledWith("Your 'todo' tasks are: ");
    expect(consoleSpy).toHaveBeenCalledWith("1. Task 1 (ID: 1)");

    consoleSpy.mockRestore();
  });

  test('should log and return "done" tasks', () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const mockTasks = [
      { id: 1, description: "Task 1", status: "todo" },
      { id: 2, description: "Task 2", status: "done" },
    ];

    fs.readFileSync.mockReturnValue(JSON.stringify(mockTasks));

    const result = getTasks("done");

    expect(result).toEqual([{ id: 2, description: "Task 2", status: "done" }]);
    expect(consoleSpy).toHaveBeenCalledWith("Your 'done' tasks are: ");
    expect(consoleSpy).toHaveBeenCalledWith("1. Task 2 (ID: 2)");

    consoleSpy.mockRestore();
  });

  test('should log and return "in-progress" tasks', () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const mockTasks = [
      { id: 1, description: "Task 1", status: "todo" },
      { id: 2, description: "Task 2", status: "in-progress" },
    ];

    fs.readFileSync.mockReturnValue(JSON.stringify(mockTasks));

    const result = getTasks("in-progress");

    expect(result).toEqual([
      { id: 2, description: "Task 2", status: "in-progress" },
    ]);
    expect(consoleSpy).toHaveBeenCalledWith("Your 'in-progress' tasks are: ");
    expect(consoleSpy).toHaveBeenCalledWith("1. Task 2 (ID: 2)");

    consoleSpy.mockRestore();
  });

  test("should throw an error if no tasks exist", () => {
    fs.readFileSync.mockReturnValue(JSON.stringify([]));

    expect(() => getTasks("all")).toThrow("No tasks found");
  });

  test("should throw an error if no tasks match the given status", () => {
    const mockTasks = [{ id: 1, description: "Task 1", status: "todo" }];

    fs.readFileSync.mockReturnValue(JSON.stringify(mockTasks));

    expect(() => getTasks("done")).toThrow("No tasks found for status 'done'");
  });

  test("should handle file read errors gracefully", () => {
    fs.readFileSync.mockImplementation(() => {
      throw new Error("File read error");
    });

    expect(() => getTasks("all")).toThrow("File read error");
  });
});
