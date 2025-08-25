import React from 'react';

interface NotificationProps {
    message: string;
    type: 'success' | 'error';
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
    const bgColor = {
        success: 'bg-green-500',
        error: 'bg-red-500',
    }[type];

    return (
        <div
            className={`fixed bottom-18 left-5/12 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center`}
        >
            <span>{message}</span>
        </div>
    );
};

export default Notification;
