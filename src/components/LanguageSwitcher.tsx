import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="flex space-x-2">
            <button
                onClick={() => changeLanguage('en')}
                className={`px-3 py-1 rounded text-sm font-medium ${
                    i18n.language.startsWith('en')
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
            >
                EN
            </button>
            <button
                onClick={() => changeLanguage('ru')}
                className={`px-3 py-1 rounded text-sm font-medium ${
                    i18n.language.startsWith('ru')
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
            >
                RU
            </button>
        </div>
    );
};

export default LanguageSwitcher;
