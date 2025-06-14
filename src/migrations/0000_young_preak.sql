CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`email` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `location` (
	`id` text PRIMARY KEY NOT NULL,
	`number` text NOT NULL,
	`street` text NOT NULL,
	FOREIGN KEY (`street`) REFERENCES `street`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `location_number_unique` ON `location` (`number`);--> statement-breakpoint
CREATE TABLE `person` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`lastname` text NOT NULL,
	`firstname` text NOT NULL,
	`gender` text NOT NULL,
	`location_id` text NOT NULL,
	FOREIGN KEY (`location_id`) REFERENCES `location`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `person_slug_unique` ON `person` (`slug`);--> statement-breakpoint
CREATE TABLE `street` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `street_slug_unique` ON `street` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `street_name_unique` ON `street` (`name`);