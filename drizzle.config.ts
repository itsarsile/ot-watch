import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./lib/schema.ts",
  out: './drizzle',
  driver: "pg",
  introspect: {
    casing: "camel",
  },
  dbCredentials: {
    ssl: true,
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
