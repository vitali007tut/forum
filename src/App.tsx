import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './components/AppRoutes';
import { UserProvider } from './contexts/UserContext';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <UserProvider>
                <div className="min-h-screen bg-gray-900 flex flex-col">
                    <Header />
                    <main className="flex-grow">
                        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                            <AppRoutes />
                        </div>
                    </main>
                    <Footer />
                </div>
            </UserProvider>
        </BrowserRouter>
    );
};

export default App;
