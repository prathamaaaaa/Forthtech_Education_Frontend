import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, MessageSquare, Users, BookOpen } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { getCategoryColor } from './utils';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// Optionally add prop types
interface GroupCardProps {
  group: {
    _id: string;
    name: string;
    description: string;
    category: string;
    progress: number;
    nextMeeting?: string;
    activeDiscussions: number;
    members: string[]; // ObjectId[]
      creator: {
      _id: string;
      email: string;
      firstName: string;
      lastName: string;
    };
    memberAvatars: string[];
  };
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
console.log("Group Card Props:", group);
  const navigate = useNavigate();
const currentUser = JSON.parse(localStorage.getItem('user') || '{}')?.user;
console.log("Current User:", currentUser.id);
const handleJoinGroup = async () => {
  if (!currentUser?.id) return toast.error("Login required");

  const isMember = group.members.includes(currentUser.id);
  const isCreator = group.creator === currentUser.id;

  if (isMember || isCreator) {
    toast.info("You are already a member of this group");
    return;
  }

  try {
    const res = await axios.post(`${import.meta.env.VITE_URL || 'http://localhost:5000'}/api/groups/${group._id}/join`, {
      userId: currentUser.id,
    });

    toast.success(res.data.message);
  } catch (err: any) {
    toast.error(err?.response?.data?.message || "Error joining group");
  }
};










  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{group.name}</CardTitle>
            <CardDescription className="mt-1">{group.description}</CardDescription>
          </div>
          <Badge className={getCategoryColor(group.category)}>
            {group.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Course Progress</span>
              <span className="font-medium">{group.progress}%</span>
            </div>
            <Progress value={group.progress} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              {/* Optionally show next meeting */}
              {/* <span className="text-sm">{group.nextMeeting}</span> */}
            </div>
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">
                {group.activeDiscussions} active discussions
              </span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">
                {group.members?.length || 0} members
              </span>
            </div>
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">6 resources</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        <div className="flex -space-x-2">
          {(group.memberAvatars || []).slice(0, 4).map((avatar, i) => (
            <Avatar key={i} className="border-2 border-background h-8 w-8">
              <AvatarImage src={avatar} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          ))}
          {group.members?.length > 4 && (
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-muted-foreground text-xs font-medium border-2 border-background">
              +{group.members.length - 4}
            </div>
          )}
        </div>
{String(group.creator?._id) === String(currentUser.id) ? (
  <div>
{/* <span>{group.creator}</span> */}
  <Button variant="secondary" disabled>
    You are the creator
  </Button>
  </div>
) : group.members.includes(currentUser.id) ? (
  <Button variant="secondary" disabled>
    Already a member
  </Button>
) : (
  <Button variant="outline" onClick={handleJoinGroup}>
    Join Group
  </Button>
)}

  
</CardFooter>
    </Card>
  );
};

export default GroupCard;
