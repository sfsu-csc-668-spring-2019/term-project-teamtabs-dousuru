import "reflect-metadata";
import { createConnection, Connection } from "typeorm";

let _db: Connection;
export async function getDatabaseConnection(): Promise<Connection> {
  if (_db) {
    console.log("cached db connection");
    return Promise.resolve(_db);
  }
  try {
    console.log("attempting to open new database connection");
    const conn = await createConnection();
    _db = conn;
    return conn;
  } catch (err) {
    console.log(err);
  }
}
