import { todos, task_groups } from "@/db/schema";
import { ExpoSQLiteDatabase} from "drizzle-orm/expo-sqlite";
import {sql} from "drizzle-orm";

import AsyncStorage from "expo-sqlite/kv-store";

export async function addDummyData(db: ExpoSQLiteDatabase) {
  const value = AsyncStorage.getItemSync('dbInitialized');
  if (value) return; // Data already added

  // console.log("Clearing existing data...");
  // await db.run(sql`DROP TABLE IF EXISTS todos;`);
  // await db.run(sql`DROP TABLE IF EXISTS task_groups;`);


  console.log("Adding dummy data...");


  // ✅ Create a few project/task groups
  const groupData = [
    { name: "Personal Growth", color: "#FF9F1C", date_created: new Date().toISOString() },
    { name: "Work", color: "#2EC4B6", date_created: new Date().toISOString() },
    { name: "Fitness", color: "#E71D36", date_created: new Date().toISOString() },
    { name: "Default", color: "#8D99AE", date_created: new Date().toISOString() }, // id = 1 fallback
  ];

  const insertedGroups = await db.insert(task_groups).values(groupData).returning({ id: task_groups.id });
  console.log("Inserted groups:", insertedGroups);

  // ✅ Map group ids (so we can assign tasks)
  const groups = await db.select().from(task_groups);

  const personalId = groups.find(g => g.name === "Personal Growth")?.id;
  const workId = groups.find(g => g.name === "Work")?.id;
  const fitnessId = groups.find(g => g.name === "Fitness")?.id;

  // ✅ Add a few todos (tasks)
  const todoData = [
    {
      title: "Read for 30 minutes",
      description: "Continue reading Atomic Habits.",
      due_date: "2025-10-08",
      date_created: new Date().toISOString(),
      priority: 2,
      completed: 0,
      task_group_id: personalId ?? 1,
    },
    {
      title: "Client meeting",
      description: "Discuss the new app feature timeline.",
      due_date: "2025-10-09",
      date_created: new Date().toISOString(),
      priority: 1,
      completed: 0,
      task_group_id: workId ?? 1,
    },
    {
      title: "Workout session",
      description: "Leg day, 45 minutes strength training.",
      due_date: "2025-10-10",
      date_created: new Date().toISOString(),
      priority: 3,
      completed: 0,
      task_group_id: fitnessId ?? 1,
    },
  ];

  await db.insert(todos).values(todoData);
  console.log("Dummy todos inserted successfully ✅");
}
