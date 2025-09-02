import React from 'react';
import LanguageSwitcher from '../features/LanguageSwitcher';
import { Github } from 'lucide-react';
import { useUserStore } from '../shared/model/useUserStore';
import { ModeToggle } from '@/shared/ui/mode-toggle';

const Footer: React.FC = () => {
    const { selectedUser } = useUserStore();

    const githubClass = `transition-[fill] duration-300 ${
        selectedUser
            ? selectedUser.id === 0
                ? 'text-chart-1 hover:fill-chart-1/50'
                : 'text-chart-2 hover:fill-chart-2/50'
            : 'text-ring hover:fill-ring/50'
    }`;

    return (
        <footer className="bg-background border-t border-accent">
            <div className="max-w-7xl mx-auto p-4">
                <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-400">© Forum App</div>
                    <a href={'https://github.com/vitali007tut/forum'}>
                        <Github className={githubClass} />
                    </a>
                    <div className="flex items-center space-x-4">
                        <ModeToggle />
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
