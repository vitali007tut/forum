import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './shared/index.css';
import './shared/i18n/i18n';
import { NotificationProvider } from './shared/api/contexts/NotificationContext';
import { ThemeProvider } from './shared/api/contexts/theme-provider';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <NotificationProvider>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <RouterProvider router={router} basepath="/forum/" />
            </ThemeProvider>
        </NotificationProvider>
    </StrictMode>
);
