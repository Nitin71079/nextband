import { db } from "./firebaseAdmin.js";

async function test() {
  try {
    console.log("Starting...");

    const collections = await db.listCollections();

    console.log("SUCCESS");
    console.log(
      collections.map(c => c.id)
    );

  } catch (err) {
    console.error("ERROR");
    console.error(err);
  }
}

test();