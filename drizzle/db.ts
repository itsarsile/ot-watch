// import postgres from "postgres";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import "dotenv/config";

// import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
neonConfig.fetchConnectionCache = true;

const queryClient = neon(process.env.DATABASE_URL!);
export const db = drizzle(queryClient);
