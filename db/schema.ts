import {int, sqliteTable, text} from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("todos", {
    id: int("id").primaryKey({autoIncrement: true}),
    title: text("title").notNull(),
    due_date: text("due_date"),
    date_created: text("date_created").notNull(),
    priority: int("priority"),
    completed: int("completed").notNull().default(0),
    task_group_id: int("task_group_id")
        .notNull()
        .references(() => task_groups.id),
});


export const task_groups = sqliteTable("task_groups", {
    id: int("id").primaryKey({autoIncrement: true}),
    name: text("name").notNull(),
    color: text("color").notNull(),
    date_created: text("date_created").notNull(),
});


export type Todo = typeof todos.$inferSelect;
export type TaskGroup = typeof task_groups.$inferSelect;

// export const calendar_dates = sqliteTable("calendar_dates", {
//   id: int("id").primaryKey({ autoIncrement: true }),
//   date: text("date").notNull().unique(), // e.g. "2025-10-07"
//   marked: int("marked").notNull().default(0), // 0 = false, 1 = true
//   starting_day: int("starting_day").notNull().default(0),
//   ending_day: int("ending_day").notNull().default(0),
//   color: text("color"), // optional, e.g. "#00B0BF"
//   note: text("note"), // optional custom note or summary
//   task_id: int("task_id").references(() => todos.id), // optional link
//   date_created: text("date_created").notNull(),
// });