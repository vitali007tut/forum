import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Posts = () => {
    const { t } = useTranslation();

      useEffect(() => {
          document.title = t('posts.title');
      }, [t]);

    return (
        <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-700 rounded-lg p-8 bg-gray-800">
                <h2 className="text-2xl font-bold text-white mb-4">{t('posts.title')}</h2>
                <p className="text-gray-300">
                    {t('posts.filter_by_user')}: {t('posts.all_users')}
                </p>
            </div>
        </div>
    );
};

export default Posts;
