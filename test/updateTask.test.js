const fs = require("fs");
const { updateTask } = require("../src/utils.js");

jest.mock("fs");

describe("updateTask function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
  });

  test('should update a task if given description', () => { 
    const mockTasks = [
      {
        id: 1,
        description: "Task 1",
        status: "todo",
        updatedAt: new Date(new Date() - Math.random() * 1e12).toString(),
      },
    ];

    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(JSON.stringify(mockTasks));

    const result = updateTask(1, { description: "updated" });

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("description", "updated");
    expect(result).toHaveProperty("status", "todo");
    expect(result).toHaveProperty("updatedAt");

    expect(result.updatedAt).not.toBe(mockTasks[0].updatedAt);

    expect(console.log).toHaveBeenCalledWith("Task updated successfully");
   });

  test('should update a task if given status', () => { 
    const mockTasks = [
      {
        id: 1,
        description: "Task 1",
        status: "todo",
        updatedAt: new Date(new Date() - Math.random() * (1e12)).toString(),
      }
    ];

    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(JSON.stringify(mockTasks));

    const result = updateTask(1, { status: "done" });
    
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("description", "Task 1");
    expect(result).toHaveProperty("status", "done");
    expect(result).toHaveProperty("updatedAt");

    expect(result.updatedAt).not.toBe(mockTasks[0].updatedAt);
    
    expect(console.log).toHaveBeenCalledWith("Task updated successfully");
   });

  test('should log an error and throw if provided ID is not a number', () => { 
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(JSON.stringify([]));

    expect(() => updateTask("notNumber", { status: "done" })).toThrow(
      "ID must be a number"
    );
    expect(console.log).toHaveBeenCalledWith(expect.any(Error));
   })

  test('should log an error and throw if there is no task with ID', () => { 
    const mockTasks = [
      { id: 1, description: "Task 1", status: "todo" },
      { id: 2, description: "Task 2", status: "todo" },
    ];

    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(JSON.stringify(mockTasks));

    expect(() => updateTask(3, { status: "done" })).toThrow(
      "There is no task with the ID of 3"
    );
    expect(console.log).toHaveBeenCalledWith(expect.any(Error));
   });

  test('should log an error and throw if there is no description or status', () => { 
    const mockTasks = [
      { id: 1, description: "Task 1", status: "todo" },
      { id: 2, description: "Task 2", status: "todo" },
    ];
    
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(JSON.stringify(mockTasks));

    expect(() => updateTask(1)).toThrow(
      "Error in updateTask: A description or status is needed"
    );
    expect(console.log).toHaveBeenCalledWith(expect.any(Error));
   })

  test('should log an error and throw when an error occurs', () => { 
    fs.existsSync.mockReturnValue(true);

    fs.readFileSync.mockImplementation(() => {
      throw new Error('File system error');
    });

    expect(() => updateTask(1, {status: "done"})).toThrow("File system error");
    expect(console.log).toHaveBeenCalledWith(expect.any(Error));
   })
})