import { pgTable, serial, text, integer } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm";

export const blogsTable = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  url: text("url").notNull(),
  likes: integer("likes").notNull().default(0),
  userId: integer("user_id").references(() => users.id),
});

export type InsertBlog = typeof blogsTable.$inferInsert;
export type SelectBlog = typeof blogsTable.$inferSelect;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull().default(""),
  token: text("token").unique(),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogsTable),
}));

export const blogsRelations = relations(blogsTable, ({ one }) => ({
  user: one(users, {
    fields: [blogsTable.userId],
    references: [users.id],
  }),
}));
