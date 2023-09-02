// import postgres from "postgres";
import {drizzle} from 'drizzle-orm/postgres-js'
import * as schema from '@/drizzle/schema'
import postgres from 'postgres'
import "dotenv/config";

// import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";

const queryClient = postgres(process.env.DATABASE_URL!);
export const db = drizzle(queryClient, { schema });
