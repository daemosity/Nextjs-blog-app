import { drizzle } from "drizzle-orm/neon-http"
import { drizzle as txDrizzle } from "drizzle-orm/neon-serverless"
import * as schema from "./schema"

export const db = drizzle(process.env.DATABASE_URL!, { schema });
export const txDb = txDrizzle(process.env.DATABASE_URL!, { schema });