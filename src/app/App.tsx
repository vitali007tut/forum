import Header from '../widgets/Header';
import Footer from '../widgets/Footer';
import { useUserStore } from '../shared/model/useUserStore';
import { useEffect } from 'react';
import { usePostStore } from '../shared/model/usePostStore';
import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const App: React.FC = () => {
    const { fetchUsers } = useUserStore();
    const { fetchPosts } = usePostStore();

    useEffect(() => {
        fetchUsers();
        fetchPosts();
    }, [fetchUsers, fetchPosts]);

    return (
        <div className="min-h-screen bg-accent flex flex-col">
            <Header />
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <Outlet />
                    <TanStackRouterDevtools />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default App;
