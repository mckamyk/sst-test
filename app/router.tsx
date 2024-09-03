// app/router.tsx
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line import/no-unresolved
import { routeTree } from './routeTree.gen'

export function createRouter() {
    const router = createTanStackRouter({
        routeTree,
    })

    return router
}

declare module '@tanstack/react-router' {
    interface Register {
        router: ReturnType<typeof createRouter>
    }
}
