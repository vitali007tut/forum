import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './components/AppRoutes';
import { useUserStore } from './store/useUserStore';
import { NotificationProvider } from './contexts/NotificationContext';

const App: React.FC = () => {
    const { fetchUsers } = useUserStore();
    
      useEffect(() => {
          fetchUsers();
      }, [fetchUsers]);

    return (
        <BrowserRouter basename="/forum/">
            <NotificationProvider>
                <div className="min-h-screen bg-gray-900 flex flex-col">
                    <Header />
                    <main className="flex-grow">
                        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                            <AppRoutes />
                        </div>
                    </main>
                    <Footer />
                </div>
            </NotificationProvider>
        </BrowserRouter>
    );
};

export default App;
