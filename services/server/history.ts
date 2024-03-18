import { type Conversation, type Message } from "@/types/chat";
import sqlite3 from "sqlite3";

const verbose = sqlite3.verbose();
const db = new verbose.Database("./database.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, err => {
  if (err) {
    console.error(err); 
    return;
  }

  console.log("Opened SQLite database");
});

export const getMessages = (conversationId: number, callbackFunc: (conv: Message[]) => void): void => {
  db.all("SELECT * FROM messages JOIN conversations ON messages.conversation_id = conversations.conversation_id WHERE conversations.conversation_id = ?", conversationId, (err, rows: Message[]) => {
    if (err) console.error(err);

    callbackFunc(rows);
  });
}

export const getConversationsWithMessages = (callbackFunc: (convs: Conversation[]) => void): void => {
  db.all(
    "SELECT * FROM messages JOIN conversations ON messages.conversation_id = conversations.conversation_id",
    (err, messages: Array<Message & Conversation>) => {
      if (err) console.error(err);

      const convs = messages.reduce((acc: Conversation[], msg) => {
        const existingConv = acc.find(c => c.conversation_id === msg.conversation_id);
        if (existingConv) {
          existingConv.messages.push(msg);
        } else {
          acc.push({
            conversation_id: msg.conversation_id,
            title: msg.title,
            messages: [msg],
            timestamp: msg.timestamp,
          });
        }
        return acc;
      }, []);

      callbackFunc(convs);
    },
  );
}


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