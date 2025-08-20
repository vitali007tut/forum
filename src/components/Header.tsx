import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from './Navigation';

const Header: React.FC = () => {
    const { t } = useTranslation();

    return (
        <header className="bg-gray-800 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex space-x-8">
                        <Link to="/" className="flex items-center text-white font-bold text-xl">
                            {t('navigation.logo')}
                        </Link>
                        <Navigation/>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
