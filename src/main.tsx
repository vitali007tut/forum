import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './shared/index.css';
import './shared/i18n/i18n';
import { BrowserRouter } from 'react-router';
import { NotificationProvider } from './shared/api/contexts/NotificationContext';
import AppRoutes from './app/AppRoutes';
import { ThemeProvider } from './shared/api/contexts/theme-provider';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <NotificationProvider>
            <BrowserRouter basename="/forum/">
                <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                    <AppRoutes />
                </ThemeProvider>
            </BrowserRouter>
        </NotificationProvider>
    </StrictMode>
);
