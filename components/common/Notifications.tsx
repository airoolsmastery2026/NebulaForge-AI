import React, { useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { X, CheckCircle, AlertTriangle, AlertCircle } from '../LucideIcons';
import type { AppNotification } from '../../types';

const notificationConfig = {
    info: { icon: AlertCircle, barColor: 'bg-blue-500', iconColor: 'text-blue-400' },
    success: { icon: CheckCircle, barColor: 'bg-green-500', iconColor: 'text-green-400' },
    warning: { icon: AlertTriangle, barColor: 'bg-yellow-500', iconColor: 'text-yellow-400' },
    error: { icon: AlertCircle, barColor: 'bg-red-500', iconColor: 'text-red-400' },
};

const Notification: React.FC<{ notification: AppNotification, onRemove: (id: number) => void }> = ({ notification, onRemove }) => {
    const { icon: Icon, barColor, iconColor } = notificationConfig[notification.type];
    const [isVisible, setIsVisible] = React.useState(false);

    useEffect(() => {
        setIsVisible(true); // Animate in
        const timer = setTimeout(() => {
            setIsVisible(false); // Animate out
            setTimeout(() => onRemove(notification.id), 300); // Remove after animation
        }, 5000);

        return () => clearTimeout(timer);
    }, [notification.id, onRemove]);

    return (
        <div
            className={`relative flex items-start w-full max-w-sm p-4 overflow-hidden glass-card shadow-lg rounded-lg transition-all duration-300 ease-in-out ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
        >
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${barColor}`} />
            <div className="flex-shrink-0 ml-2">
                <Icon className={`h-6 w-6 ${iconColor}`} aria-hidden="true" />
            </div>
            <div className="ml-3 w-0 flex-1">
                <p className="text-sm font-medium text-gray-100">{notification.message}</p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
                <button
                    className="inline-flex rounded-md text-gray-400 hover:text-gray-200 focus:outline-none"
                    onClick={() => onRemove(notification.id)}
                >
                    <span className="sr-only">Close</span>
                    <X className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};


export const Notifications: React.FC = () => {
    const { notifications, removeNotification } = useAppContext();

    return (
        <div
            aria-live="assertive"
            className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-[100]"
        >
            <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
                {notifications.map((notification) => (
                    <Notification
                        key={notification.id}
                        notification={notification}
                        onRemove={removeNotification}
                    />
                ))}
            </div>
        </div>
    );
};