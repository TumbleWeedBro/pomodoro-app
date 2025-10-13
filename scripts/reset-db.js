import { drizzleDb } from "../db"; // your Drizzle DB instance
import { sql } from "drizzle-orm";
import { exec } from "child_process";

async function resetDb() {
  // Get all tables
  const tables = await drizzleDb.all(
    sql`SELECT name FROM sqlite_master WHERE type='table'`
  );

  // Drop all non-system tables
  for (const table of tables) {
    if (!table.name.startsWith("sqlite_")) {
      console.log(`Dropping table: ${table.name}`);
      await drizzleDb.run(sql`DROP TABLE IF EXISTS ${sql(table.name)}`);
    }
  }

  console.log("All tables dropped. Running migrations...");

  // Run drizzle-kit migrations
  exec("npx drizzle-kit migrate:up", (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
    if (stderr) console.error(stderr);
  });
}

resetDb();
