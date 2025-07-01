import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Cpu, Box, Wrench, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Pathway {
  id: string;
  title: string;
  description: string;
  courses: number;
  icon: React.ReactNode;
}

const pathways: Pathway[] = [
  {
    id: 'programming',
    title: 'Programming',
    description: 'Learn C++, Python, and more',
    courses: 12,
    icon: <Code className="h-6 w-6 text-forthtech-red" />,
  },
  {
    id: 'hardware',
    title: 'Hardware',
    description: 'Electronics and components',
    courses: 8,
    icon: <Cpu className="h-6 w-6 text-forthtech-red" />,
  },
  {
    id: '3d-design',
    title: '3D Design',
    description: 'CAD and 3D printing',
    courses: 6,
    icon: <Box className="h-6 w-6 text-forthtech-red" />,
  },
  {
    id: 'assembly',
    title: 'Assembly',
    description: 'Build and integrate',
    courses: 10,
    icon: <Wrench className="h-6 w-6 text-forthtech-red" />,
  },
];

const LearningPathways = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Learning Pathways</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pathways.map((pathway) => (
          <Link to={`/learning-hub/${pathway.id}`} key={pathway.id}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader className="p-4">
                <div className="mb-3">{pathway.icon}</div>
                <CardTitle className="text-lg">{pathway.title}</CardTitle>
                <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                  {pathway.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{pathway.courses} Courses</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LearningPathways;