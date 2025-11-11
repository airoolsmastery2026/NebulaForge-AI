import React, { useState, useEffect, useRef } from 'react';
import { useI18n } from '../../hooks/useI18n';
import { Globe, Check } from '../LucideIcons';

interface TimeZone {
    labelKey: string;
    timeZone: string;
}

const timeZones: TimeZone[] = [
    { labelKey: 'headerClock.America/New_York', timeZone: 'America/New_York' },
    { labelKey: 'headerClock.Europe/London', timeZone: 'Europe/London' },
    { labelKey: 'headerClock.Asia/Tokyo', timeZone: 'Asia/Tokyo' },
    { labelKey: 'headerClock.America/Los_Angeles', timeZone: 'America/Los_Angeles' },
    { labelKey: 'headerClock.Asia/Ho_Chi_Minh', timeZone: 'Asia/Ho_Chi_Minh' },
];

interface FormattedTime {
    time: string;
    date: string;
    day: string;
}

export const HeaderClock: React.FC = () => {
    const { t, locale } = useI18n();
    const [currentTime, setCurrentTime] = useState<Date>(new Date());
    const [primaryTimeZoneIndex, setPrimaryTimeZoneIndex] = useState(0);
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const pickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setIsPickerOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const formatDateTime = (date: Date, tz: string): FormattedTime => {
        const options: Intl.DateTimeFormatOptions = { timeZone: tz };
        return {
            time: date.toLocaleTimeString(locale, { ...options, hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            date: date.toLocaleDateString(locale, { ...options, day: '2-digit', month: '2-digit', year: 'numeric' }),
            day: date.toLocaleDateString(locale, { ...options, weekday: 'long' }),
        };
    };

    const primaryTimeZone = timeZones[primaryTimeZoneIndex];
    const formattedPrimaryTime = formatDateTime(currentTime, primaryTimeZone.timeZone);

    const handleSelectTimeZone = (index: number) => {
        setPrimaryTimeZoneIndex(index);
        setIsPickerOpen(false);
    };

    return (
        <div className="relative flex items-center space-x-3 glass-card px-3 py-1.5 rounded-lg h-12">
            <button 
                onClick={() => setIsPickerOpen(!isPickerOpen)} 
                className="transition-transform duration-300 hover:scale-110"
                title={t('headerClock.timezone')}
            >
                <Globe className="w-6 h-6 text-cyan-300 animate-spin-slow" />
            </button>

            {isPickerOpen && (
                <div ref={pickerRef} className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 dropdown-glass rounded-lg shadow-2xl z-20 overflow-hidden">
                    <ul className="py-1">
                        {timeZones.map((tz, index) => (
                            <li key={tz.timeZone}>
                                <button 
                                    onClick={() => handleSelectTimeZone(index)}
                                    className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-primary-500/30 flex items-center justify-between"
                                >
                                    <span>{t(tz.labelKey)}</span>
                                    {index === primaryTimeZoneIndex && <Check className="h-4 w-4 text-cyan-300" />}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="h-8 w-px bg-gray-600/50 hidden sm:block" />

            <div className="text-center">
                <div className="font-digital text-xl text-cyan-300 tracking-wider tabular-nums">
                    {formattedPrimaryTime.time}
                </div>
                <div className="text-xs text-gray-400 -mt-1 hidden md:block">
                     {formattedPrimaryTime.day}, {formattedPrimaryTime.date}
                </div>
            </div>
        </div>
    );
};