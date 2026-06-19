import { pgTable, serial, text, integer} from "drizzle-orm/pg-core"

export const blogsTable = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  url: text("url").notNull(),
  likes: integer("likes").notNull().default(0)
});

export type InsertBlog = typeof blogsTable.$inferInsert;
export type SelectBlog = typeof blogsTable.$inferSelect;