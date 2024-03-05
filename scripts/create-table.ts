import { type Database } from "sqlite3";

export const createTables = (db: Database): void => {
    db.run(`CREATE TABLE IF NOT EXISTS conversations (
    conversation_id INTEGER PRIMARY KEY, 
    title TEXT, 
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS messages (
    message_id INTEGER PRIMARY KEY,
    conversation_id INTEGER NOT NULL,
    content TEXT,
    system BOOLEAN NOT NULL DEFAULT 0,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_id)
      REFERENCES conversations (conversation_id)
  )`);
};
