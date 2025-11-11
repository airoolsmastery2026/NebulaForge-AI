import React from 'react';
import { DigitalClock } from './DigitalClock';

const timeZones = [
    { label: 'NYC', timeZone: 'America/New_York' },
    { label: 'LDN', timeZone: 'Europe/London' },
    { label: 'TYO', timeZone: 'Asia/Tokyo' },
    { label: 'SFO', timeZone: 'America/Los_Angeles' },
];

export const WorldClock: React.FC = () => {
    return (
        <div className="flex items-center space-x-4 glass-card px-4 py-2 rounded-lg">
            {timeZones.map((tz, index) => (
                <React.Fragment key={tz.label}>
                    <DigitalClock label={tz.label} timeZone={tz.timeZone} />
                    {index < timeZones.length - 1 && <div className="h-8 w-px bg-gray-600/50" />}
                </React.Fragment>
            ))}
        </div>
    );
};
