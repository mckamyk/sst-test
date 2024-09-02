import {db} from "../../db/init";
import {catsTable} from "../../db/schema";
import {eq} from "drizzle-orm";

export async function addCat(catData: {
	name: string;
	age: number;
	breed: string;
	isIndoor?: boolean;
}) {
	const [newCat] = await db
		.insert(catsTable)
		.values({
			name: catData.name,
			age: catData.age,
			breed: catData.breed,
			isIndoor: catData.isIndoor ?? true,
		})
		.returning();
	return newCat;
}

export async function getCats() {
	const cats = await db.select().from(catsTable);
	return cats;
}

export async function getCatById(id: number) {
	if (!id) {
		throw new Error('Invalid ID provided.');
	}
	const [cat] = await db.select().from(catsTable).where(eq(catsTable.id, id));

	if (!cat) {
		throw new Error(`Cat with ID ${id} not found.`);
	}

	return cat;
}

export async function updateCatById(
	id: number,
	updateData: Partial<{
		name: string;
		age: number;
		breed: string;
		isIndoor: boolean;
		ownerName: string;
	}>
) {
	const [updatedCat] = await db
		.update(catsTable)
		.set(updateData)
		.where(eq(catsTable.id, id))
		.returning();

	if (!updatedCat) {
		throw new Error(`Cat with ID ${id} not found.`);
	}
	return updatedCat;
}

// Delete a cat by ID
export async function deleteCatById(id: number) {
	const [deletedCat] = await db
		.delete(catsTable)
		.where(eq(catsTable.id, id))
		.returning();
	return deletedCat || null;
}