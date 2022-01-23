import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("PUT to the database");
  const jateDb = await openDB("mate", 1);
  const tx = jateDb.transaction("mate", "readwrite");
  const store = tx.objectStore("mate");
  const request = store.put({ id: 1, text: content });
  const result = await request;
  console.log("data saved to the database", result);
};

// Gets all the content from the database
export const getDb = async () => {
  console.log("GET all from the database");
  const jateDb = await openDB("mate", 1);
  const tx = jateDb.transaction("mate", "readonly");
  const store = tx.objectStore("mate");
  const request = store.getAll();
  const result = await request;
  console.log("result.value", result);
  return result[0]?.jate;
};

initdb();
