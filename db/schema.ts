import { pgTable, serial, text, integer, boolean } from "drizzle-orm/pg-core"
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

export const readingList = pgTable("reading_list", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  blogId: integer("blog_id").notNull().references(() => blogsTable.id),
  read: boolean("read").notNull().default(false),
});

export type InsertReadingList = typeof readingList.$inferInsert;
export type SelectReadingList = typeof readingList.$inferSelect;

// Table Relations

export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogsTable),
  readingList: many(readingList),
}));

export const blogsRelations = relations(blogsTable, ({ one, many }) => ({
  user: one(users, {
    fields: [blogsTable.userId],
    references: [users.id],
  }),
  readingList: many(readingList),
}));

export const readingListRelations = relations(readingList, ({ one }) => ({
  blog: one(blogsTable, {
    fields: [readingList.blogId],
    references: [blogsTable.id],
  }),
  user: one(users, {
    fields: [readingList.userId],
    references: [users.id],
  }),
}));