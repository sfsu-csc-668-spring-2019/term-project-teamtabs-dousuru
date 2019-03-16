export class Todo {
  private _name: string;
  private _completed: boolean;
  private _id: number;

  private static _nextId = 0;

  private static nextId() {
    return this._nextId++;
  }

  public constructor(name: string, completed = false, id: number = null) {
    this._name = name;
    this._completed = completed;
    this._id = id ? id : Todo.nextId();
  }

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get completed(): boolean {
    return this._completed;
  }

  public set name(newName: string) {
    this._name = newName;
  }

  public set completed(newCompleted: boolean) {
    this._completed = newCompleted;
  }
}
