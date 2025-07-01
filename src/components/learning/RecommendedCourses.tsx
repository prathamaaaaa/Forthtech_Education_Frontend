
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Code, Cpu, Settings } from 'lucide-react';

const RecommendedCourses = () => {
  const courses = [
    {
      id: 'advanced-oop',
      title: 'Advanced Object-Oriented Programming',
      description: 'Learn advanced OOP concepts for robotics software development',
      category: 'Software',
      icon: <Code className="h-5 w-5 text-forthtech-red" />,
      level: 'Intermediate',
      duration: '4 weeks',
      badge: 'Popular',
      badgeColor: 'bg-amber-500'
    },
    {
      id: 'sensor-integration',
      title: 'Sensor Integration & Signal Processing',
      description: 'Master the techniques for processing and integrating sensor data',
      category: 'Electronics',
      icon: <Cpu className="h-5 w-5 text-blue-600" />,
      level: 'Intermediate',
      duration: '3 weeks',
      badge: 'New',
      badgeColor: 'bg-green-500'
    },
    {
      id: 'mechanical-design',
      title: '3D Printing for Robotics',
      description: 'Design and print custom mechanical components for your robots',
      category: 'Mechanical',
      icon: <Settings className="h-5 w-5 text-green-600" />,
      level: 'Beginner',
      duration: '2 weeks',
      badge: null,
      badgeColor: ''
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Recommended For You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {course.icon}
                  <span className="text-sm text-gray-500">{course.category}</span>
                </div>
                {course.badge && (
                  <Badge className={course.badgeColor}>{course.badge}</Badge>
                )}
              </div>
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div>Level: {course.level}</div>
                <div>Duration: {course.duration}</div>
              </div>
              <Button className="w-full bg-forthtech-red hover:bg-red-600">
                Start Course
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendedCourses;
