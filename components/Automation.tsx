import React, { useState } from "react";
import { Button } from './common/Button';
import { Card, CardHeader, CardTitle, CardDescription } from './common/Card';
import { 
  Play, 
  Trash,
  Plus,
  Upload
} from "./LucideIcons";
import type { VideoIdea, IdeaStatus } from '../types';
import { useI18n } from "../hooks/useI18n";
import { AffiliateMonitor } from "./AffiliateMonitor";
import { AffiliateDashboard } from "./AffiliateDashboard";

interface AutomationProps {
    videoIdeas: VideoIdea[];
    setVideoIdeas: React.Dispatch<React.SetStateAction<VideoIdea[]>>;
}

export const Automation: React.FC<AutomationProps> = ({ videoIdeas, setVideoIdeas }) => {
    const [newIdea, setNewIdea] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Tech");
    const { t } = useI18n();

    const handleAddIdea = () => {
        if (newIdea.trim()) {
          const newIdeaObj: VideoIdea = {
            id: Date.now(),
            title: newIdea,
            category: selectedCategory,
            status: "Generated"
          };
          setVideoIdeas(prev => [newIdeaObj, ...prev]);
          setNewIdea("");
        }
    };

    const handleDeleteIdea = (id: number) => {
        setVideoIdeas(videoIdeas.filter(idea => idea.id !== id));
    };
    
    const handleUpdateStatus = (id: number, newStatus: IdeaStatus) => {
        setVideoIdeas(videoIdeas.map(idea => 
          idea.id === id ? {...idea, status: newStatus} : idea
        ));
    };

    const categories = ["Tech", "Health", "Lifestyle", "Finance"];

    return (
        <div className="space-y-8">
            <AffiliateDashboard />

            <Card>
                <CardHeader>
                  <CardTitle>{t('automation.title')}</CardTitle>
                  <CardDescription>{t('automation.description')}</CardDescription>
                </CardHeader>
                <div className="p-4 space-y-4 md:space-y-0 md:flex md:gap-2">
                    <input
                      value={newIdea}
                      onChange={(e) => setNewIdea(e.target.value)}
                      placeholder={t('automation.placeholder')}
                      className="w-full md:flex-1 bg-gray-800/50 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    />
                    <select 
                        value={selectedCategory} 
                        onChange={e => setSelectedCategory(e.target.value)}
                        className="w-full md:w-32 bg-gray-800/50 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    >
                        {categories.map(cat => <option key={cat} value={cat}>{t(`automation.${cat}`)}</option>)}
                    </select>
                    <Button onClick={handleAddIdea} className="w-full md:w-auto" icon={<Plus className="h-4 w-4" />}> {t('automation.addIdea')}</Button>
                </div>
                 <div className="p-4 space-y-3 list-item-highlight">
                    {videoIdeas.map((idea) => (
                      <div 
                        key={idea.id} 
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg border border-gray-700 p-4 transition-colors"
                      >
                        <div className="mb-4 sm:mb-0">
                          <h3 className="font-medium text-bright">{idea.title}</h3>
                          <div className="mt-1 flex items-center space-x-2 text-sm text-gray-400">
                            <span className="rounded-full bg-gray-700 px-2 py-1 text-xs text-gray-300">
                              {t(`automation.${idea.category}`)}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              idea.status === "Generated" 
                                ? "bg-blue-500/20 text-blue-300" 
                                : idea.status === "In Production" 
                                  ? "bg-yellow-500/20 text-yellow-300" 
                                  : "bg-green-500/20 text-green-300"
                            }`}>
                              {t(`automation.${idea.status}`)}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {idea.status === "Generated" && (
                            <Button size="sm" onClick={() => handleUpdateStatus(idea.id, 'In Production')} icon={<Play className="h-4 w-4" />}>
                                {t('automation.start')}
                            </Button>
                          )}
                          {idea.status === "In Production" && (
                            <Button size="sm" variant="secondary" onClick={() => handleUpdateStatus(idea.id, 'Published')} icon={<Upload className="h-4 w-4" />}>
                                {t('automation.publish')}
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleDeleteIdea(idea.id)}
                            className="text-red-400 hover:text-red-500 hover:bg-red-500/10"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
            </Card>

            <AffiliateMonitor />
        </div>
    );
};
