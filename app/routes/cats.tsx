// app/routes/cats.tsx
import {getCats, addCat, deleteCatById, updateCatById} from '../server/cats';
import {Label} from "../components/ui/label";
import {Input} from "../components/ui/input";
import {Button} from "../components/ui/button";
import {Checkbox} from "../components/ui/checkbox";

import { createFileRoute, useRouter } from '@tanstack/react-router'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
export const Route = createFileRoute("/cats")({
	component: CatsPage,
	loader: async () => await getAllCats(),
})

async function getAllCats() {
	const allCats = await getCats();
	return {cats: allCats};
}

async function action({ actionType, formData }: { actionType: string, formData: FormData }) {
	if (actionType === 'create') {
		const name = formData.get('name') as string;
		const age = Number(formData.get('age'));
		const breed = formData.get('breed') as string;
		const isIndoor = formData.get('isIndoor') === 'true';
		await addCat({name, age, breed, isIndoor});
	}

	if (actionType === 'update') {
		const id = Number(formData.get('id'));
		const name = formData.get('name') as string;
		const age = Number(formData.get('age'));
		const breed = formData.get('breed') as string;
		const isIndoor = formData.get('isIndoor') === 'on';
		await updateCatById({id, name, age, breed, isIndoor});
	}

	if (actionType === 'delete') {
		const id = Number(formData.get('id'));

		await deleteCatById(id);
	}
}

function CatsPage() {
	const router = useRouter()
	const { cats } = Route.useLoaderData();

	const handleSubmit = () => {
		return action({ actionType:"create", formData: new FormData()}).then(() => {
			return router.invalidate();
		})
	}

	return (
		<div className={"py-8 px-14"}>
			<h1 className={"text-3xl"}>Manage Cats</h1>

			<form method="post" className={"min-w-[400px] flex flex-col items-start justify-start gap-4"}>
				<h2 className={"text-xl"}>Add New Cat</h2>
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="name">Name:</Label>
					<Input type="text" name="name" id="name" placeholder="Name:" required={true}/>
				</div>

				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="age">Age:</Label>
					<Input type="number" name="age" id="age" placeholder="Age:" required={true}/>
				</div>

				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="breed">Breed:</Label>
					<Input type="text" name="breed" id="breed" placeholder="Breed:" required={true}/>
				</div>

				<div className="flex items-center space-x-2">
					<Checkbox id="isIndoor" name={"isIndoor"}/>
					<Label htmlFor="isIndoor" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Indoor</Label>
				</div>

				<Button type="submit" name="_action" value="create">
					Add Cat
				</Button>
			</form>

			<h2 className={"mt-6 mb-4 text-2xl"}>Current Cats</h2>
			<div className={"flex flex-wrap items-center align-middle gap-4"}>
				{cats.sort((a, b) => (a.id - b.id)).map((cat) => (
					<div key={cat.id} className={"rounded-2xl border p-4"}>
						<form method="post" className={"min-w-[400px] flex flex-col items-start justify-start gap-4"}>

							<div className="grid w-full max-w-sm items-center gap-1.5">
								<Label htmlFor="id">Id:</Label>
								<Input className={"pointer-events-none cursor-not-allowed"} defaultValue={cat.id} type="text" name="id" id="id" placeholder="Id:"/>
							</div>

							<div className="grid w-full max-w-sm items-center gap-1.5">
								<Label htmlFor="name">Name:</Label>
								<Input defaultValue={cat.name} type="text" name="name" id="name" placeholder="Name:"/>
							</div>

							<div className="grid w-full max-w-sm items-center gap-1.5">
								<Label htmlFor="age">Age: </Label>
								<Input defaultValue={cat.age} type="number" name="age" id="age" placeholder="Name:"/>
							</div>

							<div className="grid w-full max-w-sm items-center gap-1.5">
								<Label htmlFor="breed">Breed:</Label>
								<Input defaultValue={cat.breed} type="text" name="breed" id="breed" placeholder="Breed:"/>
							</div>

							<div className="flex items-center space-x-2">
								<Checkbox defaultChecked={cat?.isIndoor || false} id="isIndoor" name={"isIndoor"}/>
								<Label htmlFor="isIndoor" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Indoor:</Label>
							</div>

							<div className={"flex items-center space-x-2"}>
								<Button type="submit" name="_action" value="update">
									Update
								</Button>
								<Button type="submit" name="_action" value="delete">
									Delete
								</Button>
							</div>

						</form>
					</div>
				))}
			</div>
		</div>
	);
}


