import React from 'react';
import type { AIModel } from '../../types';
import { useI18n } from '../../hooks/useI18n';

interface QualitySelectorProps {
    selectedModel: AIModel;
    onChange: (model: AIModel) => void;
    className?: string;
}

export const QualitySelector: React.FC<QualitySelectorProps> = ({ selectedModel, onChange, className = '' }) => {
    const { t } = useI18n();
    const models: { model: AIModel, labelKey: string }[] = [
        { model: 'VEO 3.1 (Fast)', labelKey: 'fast' },
        { model: 'VEO 3.1 (HQ)', labelKey: 'hq' }
    ];

    const baseClasses = "px-3 py-1.5 text-xs font-semibold rounded-md transition-colors duration-200";
    const activeClasses = "bg-primary-600 text-white shadow-md";
    const inactiveClasses = "bg-gray-700/50 hover:bg-gray-600/80 text-gray-300";

    return (
        <div className={`flex items-center space-x-2 ${className}`}>
            <span className="text-sm font-medium text-gray-400">{t('qualitySelector.quality')}:</span>
            <div className="flex items-center space-x-1 p-1 bg-gray-800/60 rounded-lg">
                {models.map(({ model, labelKey }) => (
                    <button
                        key={model}
                        onClick={() => onChange(model)}
                        className={`${baseClasses} ${selectedModel === model ? activeClasses : inactiveClasses}`}
                    >
                        {t(`qualitySelector.${labelKey}`)}
                    </button>
                ))}
            </div>
        </div>
    );
};
