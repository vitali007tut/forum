import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useUserStore } from './store/useUserStore';

const App: React.FC = () => {
    const { fetchUsers } = useUserStore();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            <Header />
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default App;
