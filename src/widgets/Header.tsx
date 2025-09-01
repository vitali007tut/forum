import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from '../entities/Navigation';
import { useUserStore } from '../shared/model/useUserStore';

const Header: React.FC = () => {
    const { t } = useTranslation();
    const { selectedUser, isSuperUserSelected } = useUserStore();

    return (
        <header className="bg-background shadow-sm sticky top-0 border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex space-x-8">
                        <Link to="/" className="flex items-center text-foreground font-bold text-xl">
                            {t('header.logo')}
                        </Link>
                        <Navigation />
                    </div>

                    <div className="flex items-center">
                        {selectedUser ? (
                            <div className="flex items-center space-x-2">
                                <span className="text-primary">{t('header.hi')}</span>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        isSuperUserSelected
                                            ? 'bg-chart-1 text-foreground font-bold shadow-lg shadow-chart-1/30'
                                            : 'bg-chart-2 text-primary-foreground'
                                    }`}
                                >
                                    {isSuperUserSelected && <span>★ </span>}
                                    {selectedUser.username}
                                </span>
                            </div>
                        ) : (
                            <span className="text-primary text-sm">{t('header.no_user')}</span>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
