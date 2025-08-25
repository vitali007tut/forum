import { Outlet } from 'react-router-dom';
import Header from '../widgets/Header';
import Footer from '../widgets/Footer';
import { useUserStore } from '../shared/model/useUserStore';
import { useEffect } from 'react';
import { usePostStore } from '../shared/model/usePostStore';

const App: React.FC = () => {
    const { fetchUsers } = useUserStore();
    const { fetchPosts } = usePostStore();

    useEffect(() => {
        fetchUsers();
        fetchPosts();
    }, [fetchUsers, fetchPosts]);

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
