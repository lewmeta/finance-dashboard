// import {z} from 'zod'
import { createInsertSchema } from "drizzle-zod";
// import {relations } from 'drizzle-orm'

import {
  // integer,
  pgTable,
  text,
  // timestamp,
} from "drizzle-orm/pg-core";

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  pladiId: text("plaid_id"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
});

export const insertAccountSchema = createInsertSchema(accounts);
