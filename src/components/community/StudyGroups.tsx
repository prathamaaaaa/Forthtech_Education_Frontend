import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GroupCard from './StudyGoupComponent/GoupCard';
import CreateGroupModal from './StudyGoupComponent/CreateGroup';
export const ENV = {
  BASE_URL: import.meta.env.VITE_URL || "http://localhost:5000",
};

const StudyGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser).user : null;

  const fetchGroups = async () => {
    try {
      const res = await axios.get(`${ENV.BASE_URL}/api/groups`);
      console.log(res)
      setGroups(res.data);
    } catch (err) {
      console.error('Failed to fetch groups', err);
    } finally {
      setLoading(false);
    }
  };


  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center text-gray-700 dark:text-gray-300 px-4">
        <h1 className="text-3xl font-semibold mb-2">Login Required</h1>
        <p className="text-sm max-w-md mb-4">
          You must be logged in to view and join study groups.
        </p>
        <a
          href="/login"
          className="bg-forthtech-red hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-all"
        >
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Study Groups</h2>
          <p className="text-muted-foreground">
            Join a group to learn together and accelerate your progress
          </p>
        </div>
        <CreateGroupModal onGroupCreated={fetchGroups} />
      </div>

      {loading ? (
        <div className="text-muted-foreground text-center py-10">Loading groups...</div>
      ) : groups.length === 0 ? (
        <div className="text-center text-muted-foreground py-10 text-lg">
          No groups available now !!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {groups.map((group) => {
            console.log("Group:", group._id);
            return <GroupCard key={group._id} group={group} />;
          })}
        </div>
      )}
    </div>
  );
};

export default StudyGroups;





// import React from 'react';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Progress } from '@/components/ui/progress';
// import { Calendar, MessageSquare, Users, BookOpen, Clock } from 'lucide-react';

// const StudyGroups = () => {
//   const storedUser = localStorage.getItem("user");
//   const currentUser = storedUser ? JSON.parse(storedUser) : null;
//   const studyGroups = [
//     {
//       id: 1,
//       name: 'Arduino Masterclass',
//       description: 'Learn the fundamentals of Arduino programming and hardware interfacing',
//       members: 24,
//       category: 'Electronics',
//       progress: 65,
//       nextMeeting: 'Tomorrow, 7:00 PM',
//       activeDiscussions: 3,
//       memberAvatars: Array(4).fill('https://github.com/shadcn.png')
//     },
//     {
//       id: 2,
//       name: 'ROS (Robot Operating System)',
//       description: 'Deep dive into ROS architecture, nodes, and practical implementations',
//       members: 18,
//       category: 'Software',
//       progress: 42,
//       nextMeeting: 'Wednesday, 6:30 PM',
//       activeDiscussions: 5,
//       memberAvatars: Array(4).fill('https://github.com/shadcn.png')
//     },
//     {
//       id: 3,
//       name: '3D Printing for Robotics',
//       description: 'Design and print custom robot components for your projects',
//       members: 31,
//       category: 'Mechanical',
//       progress: 78,
//       nextMeeting: 'Friday, 5:00 PM',
//       activeDiscussions: 2,
//       memberAvatars: Array(4).fill('https://github.com/shadcn.png')
//     },
//     {
//       id: 4,
//       name: 'Machine Learning for Robotics',
//       description: 'Apply ML techniques to improve robot perception and decision-making',
//       members: 16,
//       category: 'AI/ML',
//       progress: 25,
//       nextMeeting: 'Next Monday, 7:30 PM',
//       activeDiscussions: 8,
//       memberAvatars: Array(4).fill('https://github.com/shadcn.png')
//     }
//   ];

//   // Function to get badge color based on category
//   const getCategoryColor = (category: string) => {
//     switch(category) {
//       case 'Electronics':
//         return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
//       case 'Software':
//         return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
//       case 'Mechanical':
//         return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
//       case 'AI/ML':
//         return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
//       default:
//         return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
//     }
//   };

// if (!currentUser) {
//   return (
//     <div className="flex flex-col items-center justify-center h-[80vh] text-center text-gray-700 dark:text-gray-300 px-4">
//       <h1 className="text-3xl font-semibold mb-2">Login Required</h1>
//       <p className="text-sm max-w-md mb-4">
//         You must be logged in to access Study Groups. Please log in to collaborate with your robotics peers.
//       </p>
//       <a
//         href="/login"
//         className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-all"
//       >
//         Go to Login
//       </a>
//     </div>
//   );
// }else{

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-2xl font-bold">Study Groups</h2>
//           <p className="text-muted-foreground">Join a group to learn together and accelerate your progress</p>
//         </div>
//         <Button>
//           <Users className="mr-2 h-4 w-4" />
//           Create Group
//         </Button>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
//         {studyGroups.map(group => (
//           <Card key={group.id} className="hover:shadow-md transition-shadow">
//             <CardHeader className="pb-2">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <CardTitle className="text-xl">{group.name}</CardTitle>
//                   <CardDescription className="mt-1">{group.description}</CardDescription>
//                 </div>
//                 <Badge className={getCategoryColor(group.category)}>{group.category}</Badge>
//               </div>
//             </CardHeader>
//             <CardContent className="pb-2">
//               <div className="space-y-4">
//                 <div>
//                   <div className="flex justify-between text-sm mb-1">
//                     <span className="text-muted-foreground">Course Progress</span>
//                     <span className="font-medium">{group.progress}%</span>
//                   </div>
//                   <Progress value={group.progress} className="h-2" />
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="flex items-center">
//                     <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
//                     <span className="text-sm">{group.nextMeeting}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
//                     <span className="text-sm">{group.activeDiscussions} active discussions</span>
//                   </div>
//                   <div className="flex items-center">
//                     <Users className="h-4 w-4 mr-2 text-muted-foreground" />
//                     <span className="text-sm">{group.members} members</span>
//                   </div>
//                   <div className="flex items-center">
//                     <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
//                     <span className="text-sm">6 resources</span>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-between pt-2">
//               <div className="flex -space-x-2">
//                 {group.memberAvatars.map((avatar, i) => (
//                   <Avatar key={i} className="border-2 border-background h-8 w-8">
//                     <AvatarImage src={avatar} />
//                     <AvatarFallback>U</AvatarFallback>
//                   </Avatar>
//                 ))}
//                 <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-muted-foreground text-xs font-medium border-2 border-background">
//                   +{group.members - 4}
//                 </div>
//               </div>
//               <Button variant="outline">Join Group</Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
      
//       <div className="mt-8">
//         <h3 className="text-xl font-bold mb-4">Upcoming Study Sessions</h3>
//         <Card>
//           <CardContent className="p-0">
//             <div className="divide-y">
//               <div className="flex items-center justify-between p-4">
//                 <div className="flex items-center">
//                   <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg mr-4">
//                     <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-300" />
//                   </div>
//                   <div>
//                     <h4 className="font-medium">Arduino Sensor Integration</h4>
//                     <p className="text-sm text-muted-foreground">Arduino Masterclass Group</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="flex items-center">
//                     <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
//                     <span className="text-sm">Tomorrow, 7:00 PM</span>
//                   </div>
//                   <Badge variant="outline" className="mt-1">20 attendees</Badge>
//                 </div>
//               </div>
              
//               <div className="flex items-center justify-between p-4">
//                 <div className="flex items-center">
//                   <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg mr-4">
//                     <Calendar className="h-5 w-5 text-green-600 dark:text-green-300" />
//                   </div>
//                   <div>
//                     <h4 className="font-medium">ROS Navigation Stack Workshop</h4>
//                     <p className="text-sm text-muted-foreground">ROS Study Group</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="flex items-center">
//                     <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
//                     <span className="text-sm">Wednesday, 6:30 PM</span>
//                   </div>
//                   <Badge variant="outline" className="mt-1">14 attendees</Badge>
//                 </div>
//               </div>
              
//               <div className="flex items-center justify-between p-4">
//                 <div className="flex items-center">
//                   <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg mr-4">
//                     <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-300" />
//                   </div>
//                   <div>
//                     <h4 className="font-medium">3D Printing Troubleshooting</h4>
//                     <p className="text-sm text-muted-foreground">3D Printing for Robotics</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="flex items-center">
//                     <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
//                     <span className="text-sm">Friday, 5:00 PM</span>
//                   </div>
//                   <Badge variant="outline" className="mt-1">26 attendees</Badge>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
// };

// export default StudyGroups;
