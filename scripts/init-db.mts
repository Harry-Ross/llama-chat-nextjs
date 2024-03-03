import sqlite3 from "sqlite3";

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
  db.run(`CREATE TABLE IF NOT EXISTS conversations (
    conversation_id INTEGER PRIMARY KEY, 
    title TEXT, 
    timestamp INTEGER
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS messages (
    message_id INTEGER PRIMARY KEY,
    conversation_id INTEGER NOT NULL,
    content TEXT,
    system BOOLEAN NOT NULL DEFAULT 0,
    timestamp INTEGER,
    FOREIGN KEY (conversation_id)
      REFERENCES conversations (conversation_id)
  )`);
});
