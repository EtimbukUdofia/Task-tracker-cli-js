const fs = require("fs");
const { addTask } = require("../src/utils.js");

jest.mock("fs");

describe("addTask function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should add a new task successfully", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    fs.readFileSync.mockReturnValue(JSON.stringify([]));

    const result = addTask("Task 1");

    expect(result).toHaveProperty("id", 1);
    expect(result).toHaveProperty("description", "Task 1");
    expect(result).toHaveProperty("status", "todo");
    expect(result).toHaveProperty("createdAt");
    expect(result).toHaveProperty("updatedAt");

    // ensures createdAt and updatedAt are strings
    expect(typeof result.createdAt).toBe("string");
    expect(typeof result.updatedAt).toBe("string");

    // ensures createdAt and updatedAt are valid date strings
    expect(new Date(result.createdAt).toString()).not.toBe("Invalid Date");
    expect(new Date(result.updatedAt).toString()).not.toBe("Invalid Date");

    // ensure fs.writeFileSync() was called correctly
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.any(String),
      expect.stringContaining('"description":"Task 1"')
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      `Task added successfully`,
      `ID: ${result.id}`
    );

    consoleSpy.mockRestore();
  });

  test("should throw an error if duplicate tasks exists", () => {
    const mockTasks = [
      { id: 1, description: "Task 1", status: "todo" },
      { id: 2, description: "Task 2", status: "todo" },
    ];

    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(JSON.stringify(mockTasks));

    expect(() => addTask("Task 1")).toThrow(
      "A task already exists with that description"
    );
  });

  test("should correctly increment task ID", () => {
    const mockTask = [{ id: 1, description: "Existing task", status: "todo" }];
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(JSON.stringify(mockTask));

    const task = addTask("New task");

    expect(task.id).toBe(2);
  });

  test("should create a task file if it does not exist", () => {
    fs.existsSync.mockReturnValue(false);

    const task = addTask("New task");

    expect(task.id).toBe(1);
    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  test("should log an error and throw when an error occurs", () => {
    console.log = jest.fn();
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockImplementation(() => {
      throw new Error("File system error");
    });

    expect(() => addTask("Failing task")).toThrow("File system error");
    expect(console.log).toHaveBeenCalledWith(expect.any(Error));
  });
});
