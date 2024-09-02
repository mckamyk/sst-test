CREATE TABLE IF NOT EXISTS "cats" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"age" integer NOT NULL,
	"breed" text NOT NULL,
	"is_indoor" boolean DEFAULT true
);
