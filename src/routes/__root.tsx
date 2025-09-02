import App from '@/app/App'
import NotFound from '@/pages/NotFound';
import { createRootRoute } from '@tanstack/react-router'


export const Route = createRootRoute({
    component: App,
    notFoundComponent: NotFound,
});
