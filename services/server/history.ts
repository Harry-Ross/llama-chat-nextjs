import { type BasicConversation, type Conversation, type Message } from "@/types/chat";
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

    console.log("Opened SQLite database for history");
  },
);

export const getMessages = (
  conversationId: number,
  callbackFunc: (conv: Message[]) => void,
): void => {
  db.all(
    "SELECT * FROM messages JOIN conversations ON messages.conversation_id = conversations.conversation_id WHERE conversations.conversation_id = ?",
    conversationId,
    (err, rows: Message[]) => {
      if (err) console.error(err);

      callbackFunc(rows);
    },
  );
};

export const getConversations = (
  callbackFunc: (convs: Conversation[]) => void,
): void => {
  db.all("SELECT * FROM conversations", (err, rows: Conversation[]) => {
    if (err) console.error(err);

    callbackFunc(rows);
  });
}

export const getConversationsWithMessages = (
  callbackFunc: (convs: BasicConversation[]) => void,
): void => {
  db.all(
    "SELECT * FROM messages JOIN conversations ON messages.conversation_id = conversations.conversation_id",
    (err, messages: Array<Message & Conversation>) => {
      if (err) console.error(err);

      const convs = messages.reduce((acc: Conversation[], msg) => {
        const existingConv = acc.find(
          (c) => c.conversation_id === msg.conversation_id,
        );
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
};

export const getMessage = (
  id: number,
  callbackFunc: (msg: Message) => void,
): void => {
  db.get(
    "SELECT * FROM messages WHERE message_id = ?",
    id,
    (err, row: Message) => {
      if (err) console.error(err);

      callbackFunc(row);
    },
  );
};

export const createConversation = (title: string, callback: (num: number) => void): void => {
  db.run(
    "INSERT INTO conversations (title) VALUES (?)",
    title,
    function (err) {
      if (err) console.error(err);
      callback(this.lastID)
    },
  );
}

export const insertMessage = (conversationId: number, content: string, system: boolean): void => {
  db.run(
    "INSERT INTO messages (conversation_id, content, system) VALUES (?, ?, ?)",
    [conversationId, content, system ? 1 : 0],
    function (err) {
      if (err) console.error(err);
      // If the message is the first in a conversation, set the conversation title to the first message
      db.run("UPDATE conversations SET title = (SELECT content FROM messages WHERE conversation_id = ? ORDER BY message_id ASC LIMIT 1) WHERE conversation_id = ?", 
      [conversationId, conversationId], 
      (err) => {
        if (err) console.error(err);
      });
    },
  );
}

export const close = (): void => {
  db.close((err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log("Closed SQLite database");
  });
};

export { db };
