
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Calendar, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const LiveDiscussions = () => {
  const discussions = [
    {
      id: 1,
      title: 'Arduino Programming Help',
      participants: 23,
      avatar: 'https://github.com/shadcn.png',
    },
    {
      id: 2,
      title: '3D Printing Tips',
      participants: 15,
      avatar: 'https://github.com/shadcn.png',
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="p-4">
        <div className="flex items-center mb-2">
          <MessageSquare className="h-5 w-5 text-forthtech-red mr-2" />
          <CardTitle className="text-lg">Live Discussions</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {discussions.map((discussion) => (
          <Link to={`/community/discussions/${discussion.id}`} key={discussion.id}>
            <div className="flex items-center mb-4 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
              <Avatar className="h-8 w-8 mr-3">
                <AvatarImage src={discussion.avatar} alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{discussion.title}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {discussion.participants} participants
                </div>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};

const UpcomingSessions = () => {
  const sessions = [
    {
      id: 1,
      title: 'Sensor Integration Workshop',
      date: 'Tomorrow, 2:00 PM',
    },
    {
      id: 2,
      title: 'Python for Robotics',
      date: 'Jan 15, 3:30 PM',
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="p-4">
        <div className="flex items-center mb-2">
          <Calendar className="h-5 w-5 text-forthtech-red mr-2" />
          <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {sessions.map((session) => (
          <Link to={`/community/sessions/${session.id}`} key={session.id}>
            <div className="mb-4 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
              <div className="font-medium">{session.title}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {session.date}
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};

const TopContributors = () => {
  const contributors = [
    {
      id: 1,
      name: 'Alex Chen',
      rating: 5,
      avatar: 'https://github.com/shadcn.png',
    },
    {
      id: 2,
      name: 'Sarah Miller',
      rating: 4,
      avatar: 'https://github.com/shadcn.png',
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="p-4">
        <div className="flex items-center mb-2">
          <User className="h-5 w-5 text-forthtech-red mr-2" />
          <CardTitle className="text-lg">Top Contributors</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {contributors.map((contributor) => (
          <Link to={`/community/users/${contributor.id}`} key={contributor.id}>
            <div className="flex items-center mb-4 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
              <Avatar className="h-8 w-8 mr-3">
                <AvatarImage src={contributor.avatar} alt={contributor.name} />
                <AvatarFallback>{contributor.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">{contributor.name}</div>
                <div className="flex">
                  {Array(5).fill(0).map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${i < contributor.rating ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};

const CommunitySection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <LiveDiscussions />
      <UpcomingSessions />
      <TopContributors />
    </div>
  );
};

export default CommunitySection;
