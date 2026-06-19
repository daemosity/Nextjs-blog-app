ALTER TABLE "blogs" DROP CONSTRAINT "blogs_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "blogs" DROP COLUMN "user_id";
--> statement-breakpoint
DROP TABLE "users";
