import { defineConfig } from "drizzle-kit";
import { Resource } from "sst";

export default defineConfig({
	schema: "./db/schema.ts",
	out: "./migrations",
	dialect: "postgresql",

	dbCredentials: {
		url: Resource.NeonDB.value,
	},
});
