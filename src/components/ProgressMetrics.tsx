
import React from 'react';
import { GraduationCap, Package, Award, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const ProgressMetric = ({ 
  icon, 
  title, 
  value, 
  color = "text-forthtech-red" 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string | number;
  color?: string;
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">{title}</span>
        <span className={`${color}`}>{icon}</span>
      </div>
      <div className="text-2xl font-bold">{value}</div>
      {title === "Course Progress" && (
        <Progress className="h-2 mt-2" value={Number(value.toString().replace('%', ''))} />
      )}
    </div>
  );
};

const ProgressMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <ProgressMetric 
        icon={<GraduationCap className="h-5 w-5" />} 
        title="Course Progress" 
        value="67%" 
      />
      <ProgressMetric 
        icon={<Package className="h-5 w-5" />} 
        title="Projects Completed" 
        value={12} 
      />
      <ProgressMetric 
        icon={<Award className="h-5 w-5" />} 
        title="Badges Earned" 
        value={8} 
      />
      <ProgressMetric 
        icon={<Trophy className="h-5 w-5" />} 
        title="Community Rank" 
        value="#42" 
      />
    </div>
  );
};

export default ProgressMetrics;
