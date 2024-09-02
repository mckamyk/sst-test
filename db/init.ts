import * as schema from "./schema"
import { drizzle } from "drizzle-orm/neon-serverless"
import {neonConfig, Pool} from "@neondatabase/serverless"
import { Resource } from "sst"
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: Resource.NeonDB.value })
export const db = drizzle(pool, { schema })
