import React from 'react';
import LanguageSwitcher from '../features/LanguageSwitcher';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';
import { useUserStore } from '../shared/model/useUserStore';

const Footer: React.FC = () => {
    const { selectedUser } = useUserStore();

    const githubClass = `transition-[fill] duration-300 ${
        selectedUser
            ? selectedUser.id === 0
                ? 'text-yellow-600 hover:fill-yellow-400'
                : 'text-indigo-500 hover:fill-indigo-300'
            : 'text-gray-50 hover:fill-gray-400'
    }`;

    return (
        <footer className="bg-gray-800 border-t border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-400">© Forum App</div>
                    <Link to={'https://github.com/vitali007tut/forum'}>
                        <Github className={githubClass} />
                    </Link>
                    <div className="flex items-center space-x-4">
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
