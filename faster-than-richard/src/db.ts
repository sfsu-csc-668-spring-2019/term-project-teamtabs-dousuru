import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { User } from "./models/User";

let _db: Connection;
export async function getDatabaseConnection(): Promise<Connection> {
  if (_db) {
    console.log("cached db connection");
    return Promise.resolve(_db);
  }
  try {
    console.log("attempting to open new database connection");
    const conn = await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "dousuru",
      entities: [User],
      synchronize: true,
      logging: true
    });
    _db = conn;
    return conn;
  } catch (err) {
    console.log(err);
  }
}
