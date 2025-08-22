import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './locales/i18n';
import { BrowserRouter } from 'react-router';
import { NotificationProvider } from './contexts/NotificationContext';
import AppRoutes from './components/AppRoutes';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <NotificationProvider>
            <BrowserRouter basename="/forum/">
                <AppRoutes />
            </BrowserRouter>
        </NotificationProvider>
    </StrictMode>
);
