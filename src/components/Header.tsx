import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from './Navigation';
import { useUserStore } from '../store/useUserStore';

const Header: React.FC = () => {
    const { t } = useTranslation();
    const { selectedUser, isSuperUserSelected } = useUserStore();

    return (
        <header className="bg-gray-800 shadow-sm shadow-gray-900 sticky top-0 border-b border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex space-x-8">
                        <Link to="/" className="flex items-center text-white font-bold text-xl">
                            {t('header.logo')}
                        </Link>
                        <Navigation />
                    </div>

                    <div className="flex items-center">
                        {selectedUser ? (
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-300">{t('header.hi')}</span>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        isSuperUserSelected
                                            ? 'bg-yellow-600 text-gray-900 font-bold shadow-lg shadow-yellow-500/30'
                                            : 'bg-indigo-600 text-white'
                                    }`}
                                >
                                    {isSuperUserSelected && <span>★ </span>}
                                    {selectedUser.username}
                                </span>
                            </div>
                        ) : (
                            <span className="text-gray-400 text-sm">{t('header.no_user')}</span>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
