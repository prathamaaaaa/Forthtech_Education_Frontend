
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface TopicProgressProps {
  title: string;
  progress: number;
  color: string;
  icon: React.ReactNode;
}

const TopicProgress = ({ title, progress, color, icon }: TopicProgressProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <h3 className="font-medium text-lg">{title}</h3>
        <div className={`rounded-full p-1.5 ${color.replace('bg-', 'bg-opacity-20 ')} text-${color.replace('bg-', '')}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Progress</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default TopicProgress;
