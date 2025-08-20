import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();

    return (
        <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-700 rounded-lg p-8 bg-gray-800">
                <h1 className="text-3xl font-bold text-white mb-4">{t('home.title')}</h1>
                <p className="text-lg text-gray-300">{t('home.description')}</p>
            </div>
        </div>
    );
};

export default Home;
