CREATE TABLE `task_groups` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`color` text NOT NULL,
	`date_created` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `todos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`due_date` text,
	`date_created` text NOT NULL,
	`priority` integer,
	`completed` integer DEFAULT 0 NOT NULL,
	`task_group_id` integer NOT NULL,
	FOREIGN KEY (`task_group_id`) REFERENCES `task_groups`(`id`) ON UPDATE no action ON DELETE no action
);
