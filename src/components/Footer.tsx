import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 border-t border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-400">© Forum App</div>
                    <div className="flex items-center space-x-4">
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
