import React, { useState, useEffect } from 'react';

interface DigitalClockProps {
    label: string;
    timeZone: string;
}

export const DigitalClock: React.FC<DigitalClockProps> = ({ label, timeZone }) => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            const date = new Date();
            const timeString = date.toLocaleTimeString('en-US', {
                timeZone,
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
            setTime(timeString);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [timeZone]);

    return (
        <div className="text-center">
            <div className="text-xs font-semibold text-gray-400 tracking-widest">{label}</div>
            <div className="font-digital text-xl text-cyan-300 tracking-wider tabular-nums">
                {time || '00:00:00'}
            </div>
        </div>
    );
};
