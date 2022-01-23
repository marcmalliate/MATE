import { openDB } from "idb";

const initdb = async () =>
  openDB("mate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("mate")) {
        console.log("mate database already exists");
        return;
      }
      db.createObjectStore("mate", { keyPath: "id", autoIncrement: true });
      console.log("mate database created");
    },
  });

// Accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("PUT to the database");
  const mateDb = await openDB("mate", 1);
  const tx = mateDb.transaction("mate", "readwrite");
  const store = tx.objectStore("mate");
  const request = store.put({ id: 1, text: content });
  const result = await request;
  console.log("data saved to the database", result);
};

// Gets all the content from the database
export const getDb = async () => {
  console.log("GET all from the database");
  const mateDb = await openDB("mate", 1);
  const tx = mateDb.transaction("mate", "readonly");
  const store = tx.objectStore("mate");
  const request = store.getAll();
  const result = await request;
  console.log("result.value", result);
  return result[0]?.mate;
};

initdb();
