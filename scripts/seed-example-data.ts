import sqlite3 from "sqlite3";
import { createTables } from "./create-table";

const conversationList = [
  "How great React is",
  "The importance of ethics in AI research",
  "Exploring the future of AI",
  "AI-powered chatbots: Enhancing customer experience",
  "Machine learning algorithms: A deep dive",
  "AI in healthcare: Revolutionizing patient care",
  "The role of AI in autonomous vehicles",
];

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
  db.run("DELETE FROM conversations", (err) => {
    if (err) console.error(err);
  });
  db.run(
    `INSERT INTO conversations (title) VALUES (?), (?), (?), (?), (?), (?), (?)`,
    conversationList,
    (err) => {
      if (err) console.error(err);
    },
  );

  db.run("DELETE FROM messages", (err) => {
    if (err) console.error(err);
  });

  db.run(
    `INSERT INTO messages (conversation_id, content, system) VALUES 
    (1, "Tell me what's great about React", 0), 
    (1, "I'm not sure, but I think it's the component-based architecture", 1)`,
    (err) => {
      if (err) console.error(err);
    },
  );

  db.run(
    `INSERT INTO messages (conversation_id, content, system) VALUES 
    (2, "Tell me the importance of ethics in AI", 0), 
    (2, "I'm not sure, but I think it's probably super duper important", 1)`,
    (err) => {
      if (err) console.error(err);
    },
  );

  db.close((err) => {
    if (err) console.error(err);
    console.log("Closed database");
  });
});
