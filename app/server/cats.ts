import {db} from "../../db/init";
import {catsTable} from "../../db/schema";
import {eq} from "drizzle-orm";
import {createServerFn} from "@tanstack/start";


type Cat = {
	id?: number;
	name: string;
	age: number;
	breed: string;
	isIndoor?: boolean;
}

export const addCat = createServerFn("POST", async (payload: Cat) => {
	const [newCat] = await db
		.insert(catsTable)
		.values({
			name: payload.name,
			age: payload.age,
			breed: payload.breed,
			isIndoor: payload.isIndoor ?? true,
		})
		.returning();
	return newCat;
})

export const getCats = createServerFn("GET", async () => {
	const cats = await db.select().from(catsTable);
	return cats;
})

export const updateCatById = createServerFn("POST", async (payload: Partial<Cat>) => {
	if (!payload.id) {
		throw new Error(`Id not provided.`);
	}
	const [updatedCat] = await db
		.update(catsTable)
		.set(payload)
		.where(eq(catsTable.id, payload.id))
		.returning();

	if (!updatedCat) {
		throw new Error(`Cat with ID ${payload.id} not found.`);
	}
	return updatedCat;
})

export const deleteCatById = createServerFn("POST", async (payload: number) => {
	const [deletedCat] = await db
		.delete(catsTable)
		.where(eq(catsTable.id, payload))
		.returning();
	return deletedCat || null;
})
