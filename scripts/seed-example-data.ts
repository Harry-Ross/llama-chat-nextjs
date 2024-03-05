import sqlite3 from "sqlite3";
import { createTables } from "./create-table";

const verbose = sqlite3.verbose();
const db = new verbose.Database(
  "./database.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log("Opened SQLite database");
  },
);


db.serialize(() => {
  createTables(db);
  db.run(
    `INSERT INTO conversations (title) VALUES (?)`,
    ["How great React is"], (err) => {
      if (err) console.error(err);
    }
  );
});
