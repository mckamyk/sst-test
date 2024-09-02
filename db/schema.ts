import {boolean, integer, pgTable, serial, text} from "drizzle-orm/pg-core";

export const catsTable = pgTable('cats', {
	id: serial('id').primaryKey(), // Auto-incrementing primary key
	name: text('name').notNull(), // Name of the cat
	age: integer('age').notNull(), // Age of the cat
	breed: text('breed').notNull(), // Breed of the cat
	isIndoor: boolean('is_indoor').default(true), // Whether the cat is an indoor cat
});