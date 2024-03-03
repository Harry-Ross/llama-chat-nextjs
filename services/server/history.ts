import { type Message } from "@/types/chat";
import sqlite3 from "sqlite3";

const verbose = sqlite3.verbose();
const db = new verbose.Database("./database.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, err => {
  if (err) {
    console.error(err); 
    return;
  }

  console.log("Opened SQLite database");
});

export const getMessage = (id: number, callbackFunc: (msg: Message) => void): void => {
  db.get("SELECT * FROM messages WHERE message_id = ?", id, (err, row: Message) => {
    if (err) console.error(err);

    callbackFunc(row);
  });
}

export const close = (): void => {
  db.close(err => {
    if (err) {
      console.error(err);
      return;
    }

    console.log("Closed SQLite database");
  });
}

export { db };