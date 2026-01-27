PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_job_application` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`company` text NOT NULL,
	`role` text NOT NULL,
	`status` text DEFAULT 'LAHETETTY' NOT NULL,
	`notes` text,
	`url` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_job_application`("id", "company", "role", "status", "notes", "url", "created_at", "updated_at") SELECT "id", "company", "role", "status", "notes", "url", "created_at", "updated_at" FROM `job_application`;--> statement-breakpoint
DROP TABLE `job_application`;--> statement-breakpoint
ALTER TABLE `__new_job_application` RENAME TO `job_application`;--> statement-breakpoint
PRAGMA foreign_keys=ON;