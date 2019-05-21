import { Todo } from "./Todo";

describe("Todo", () => {
  it("can be constructed with just a name", () => {
    const todo = new Todo("new task");
    expect(todo).not.toBeNull();
  });
  it("should have auto-incremented id when constructed", () => {
    const todo = new Todo("first");
    const todo2 = new Todo("second");
    expect(todo.id).not.toBeNull();
    expect(todo2.id).not.toBeNull();
    expect(todo.id).not.toEqual(todo2.id);
  });
});
