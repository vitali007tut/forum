import React, { createContext, useState } from 'react';
import Notification from '../components/Notification';

type NotificationType = 'success' | 'error' ;

interface NotificationContextType {
    showNotification: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notification, setNotification] = useState<{
        message: string;
        type: NotificationType;
    } | null>(null);

    const showNotification = (message: string, type: NotificationType) => {
        setNotification({ message, type });

        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                />
            )}
        </NotificationContext.Provider>
    );
};

export { NotificationContext };
