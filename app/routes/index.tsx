// app/routes/index.tsx
import * as fs from 'fs'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'

const filePath = 'count.txt';

async function readCount() {
    return parseInt(
        await fs.promises.readFile(filePath, 'utf-8').catch(() => '0'),
    )
}

export const getCount = createServerFn('GET', () => {
    return readCount()
})

export const updateCount = createServerFn('POST', async (addBy: number) => {
    const count = await readCount()
    await fs.promises.writeFile(filePath, `${count + addBy}`)
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const Route = createFileRoute('/')({
    component: Home,
    loader: async () => await getCount(),
})

function Home() {
    const router = useRouter()
    const state = Route.useLoaderData()

    return (
        <button
            onClick={() => {
                updateCount(1).then(() => {
                    return router.invalidate()
                })
            }}
        >
            Add 1 to {state}?
        </button>
    )
}
