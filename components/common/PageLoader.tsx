
import React from 'react';
import { Spinner } from './Spinner';

export const PageLoader: React.FC = () => (
    <div className="flex items-center justify-center h-full w-full">
        <Spinner />
    </div>
);