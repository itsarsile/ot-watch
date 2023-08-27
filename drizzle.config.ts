import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./lib/schema",
  driver: "pg",
  introspect: {
    casing: "preserve",
  },
  dbCredentials: {
    ssl: true,
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
