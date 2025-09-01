import { Button } from '@/shared/shadcn/button';
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="flex space-x-2">
            <Button
                onClick={() => changeLanguage('en')}
                variant={`${i18n.language.startsWith('ru') ? 'outline' : 'default'}`}
                size="icon"
            >
                EN
            </Button>
            <Button
                onClick={() => changeLanguage('ru')}
                size="icon"
                variant={`${i18n.language.startsWith('ru') ? 'default' : 'outline'}`}
            >
                RU
            </Button>
        </div>
    );
};

export default LanguageSwitcher;
