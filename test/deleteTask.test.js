const fs = require("fs");
const { deleteTask } = require("../src/utils.js");

jest.mock("fs");

describe("deleteTask function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
  });

  test('should delete all tasks', () => { 
    const mockTasks = [
      { id: 1, description: "Task 1", status: "todo" },
      { id: 2, description: "Task 2", status: "done" },
    ];

    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockImplementation(() => JSON.stringify(mockTasks));

    deleteTask("all");

    expect(fs.writeFileSync).toHaveBeenCalledWith(expect.any(String), JSON.stringify([]));
    expect(console.log).toHaveBeenCalledWith("All tasks deleted successfully");
  });
  
  test('should throw an error if trying to delete all tasks but no task in task file', () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockImplementation(() => JSON.stringify([]));

    expect(() => deleteTask("all")).toThrow("No task currently in memory");
    expect(console.log).toHaveBeenCalledWith(expect.any(Error));
  });

  test("should delete a task given it's ID", () => {
    const mockTasks = [
      { id: 1, description: "Task 1", status: "todo" },
      { id: 2, description: "Task 2", status: "done" },
    ];

    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockImplementation(() => JSON.stringify(mockTasks));

    const result = deleteTask(2);

    expect(result).toEqual(mockTasks[1]);
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify(mockTasks.slice(0, 1))
    );
    expect(console.log).toHaveBeenCalledWith("Task deleted successfully");
  });

  test("should log an error and throw if provided ID is not a number", () => {
    const mockTasks = [{ id: 1, description: "Task 1", status: "todo" }];

    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockImplementation(() => JSON.stringify(mockTasks));

    expect(() => deleteTask("notNumber")).toThrow("ID must be a number");
    expect(console.log).toHaveBeenCalled();
  });

  test("should log an erorr and throw if there is no task with the provided ID", () => {
    const mockTasks = [{ id: 1, description: "Task 1", status: "todo" }];

    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockImplementation(() => JSON.stringify(mockTasks));

    expect(() => deleteTask(2)).toThrow("There is no task with the ID of 2");
    expect(console.log).toHaveBeenCalled();
  });

  test("should log an error and throw when an error occurs", () => {
    fs.existsSync.mockReturnValue(true);

    fs.readFileSync.mockImplementation(() => {
      throw new Error("File system error");
    });

    expect(() => deleteTask(1)).toThrow("File system error");
    expect(console.log).toHaveBeenCalledWith(expect.any(Error));
  });
});
