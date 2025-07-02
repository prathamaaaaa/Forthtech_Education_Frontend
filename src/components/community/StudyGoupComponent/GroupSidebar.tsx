import React, { useEffect, useState } from "react";
// Removed direct imports for Avatar and Button, they will be defined locally
import { toast } from "sonner"; // Assuming sonner is globally available or handled
import axios from "axios"; // Assuming axios is globally available or handled

// --- Local Implementations for UI Components (for self-containment) ---

// Basic Avatar component using Tailwind CSS
const Avatar: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>
    {children}
  </div>
);

// Basic AvatarFallback component using Tailwind CSS
const AvatarFallback: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <div className={`flex h-full w-full items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 ${className}`}>
    {children}
  </div>
);

// Basic Button component using Tailwind CSS
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive";
  size?: "sm" | "default";
}

const Button: React.FC<ButtonProps> = ({ className, variant = "default", size = "default", children, ...props }) => {
  let baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  let variantClasses = "";
  let sizeClasses = "";

  if (variant === "default") {
    variantClasses = "bg-blue-500 text-white shadow hover:bg-blue-600";
  } else if (variant === "destructive") {
    variantClasses = "bg-red-500 text-white shadow-sm hover:bg-red-600";
  }

  if (size === "default") {
    sizeClasses = "h-9 px-4 py-2";
  } else if (size === "sm") {
    sizeClasses = "h-8 rounded-md px-3 text-xs";
  }

  return (
    <button className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};
// --- End Local Implementations ---


interface User {
  _id: string; 
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface Group {
  _id: string;
  name: string;
  creator?: User;
  joinRequests?: User[]; 
}

interface GroupSidebarProps {
  socket: any;
  currentUserId: string;
  setSelectedGroup?: (group: Group) => void;
}

const GroupSidebar: React.FC<GroupSidebarProps> = ({
  socket,
  currentUserId,
  setSelectedGroup,
}) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [joinRequests, setJoinRequests] = useState<
    { groupId: string; groupName: string; user: User }[] // Type 'user' as User
  >([]);

  // Hardcode BASE_URL for this self-contained environment
 const ENV = {
  BASE_URL: import.meta.env.VITE_URL || "http://localhost:5000",
};
  /**
   * Fetches groups for the current user and processes join requests.
   * Leverages backend population for joinRequests.
   */
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // Only fetch groups, as joinRequests should now be populated by the backend
        const groupRes = await axios.get(`${ENV.BASE_URL}/api/groups?userId=${currentUserId}`);

        const userGroups: Group[] = groupRes.data || [];
        const requestList: { groupId: string; groupName: string; user: User }[] = [];

        userGroups.forEach((group: Group) => {
          const isCreator = group.creator?._id === currentUserId;

          if (isCreator && group.joinRequests && group.joinRequests.length > 0) {
            group.joinRequests.forEach((reqUser: User) => {
              // reqUser is now expected to be a full User object directly from the backend due to populate
              // It will have reqUser._id
              requestList.push({
                groupId: group._id,
                groupName: group.name,
                user: reqUser, // Use the directly populated user object which should have _id
              });
            });
          }
        });

        setGroups(userGroups);
        setJoinRequests(requestList);
      } catch (err) {
        console.error("Error fetching groups:", err);
        toast.error("Failed to load groups.");
      }
    };

    if (currentUserId) {
      fetchGroups();
    }
  }, [currentUserId, ENV.BASE_URL]);

  /**
   * Handles new group creation notifications from the socket.
   */
  useEffect(() => {
    if (!socket) return;

    const handleNewGroup = (group: Group) => {
      const alreadyExists = groups.find((g) => g._id === group._id);
      if (!alreadyExists) {
        setGroups((prev) => [...prev, group]);
        toast.success(`New group created: ${group.name}`);
      }
    };

    socket.on("group-created", handleNewGroup);

    return () => socket.off("group-created", handleNewGroup);
  }, [socket, groups]);

  const handleAcceptRequest = async (groupId: string, userId: string) => {
    try {
      await axios.post(`${ENV.BASE_URL}/api/groups/${groupId}/accept-request`, { userId });
      toast.success("User added to group");
      setJoinRequests((prev) =>
        prev.filter((r) => !(r.groupId === groupId && r.user._id === userId))
      );
    } catch (error) {
      console.error("Failed to accept request:", error);
      toast.error("Failed to accept request");
    }
  };


  const handleRejectRequest = async (groupId: string, userId: string) => {
    try {
      await axios.post(`${ENV.BASE_URL}/api/groups/${groupId}/reject-request`, { userId });
      toast.success("Request rejected");
      setJoinRequests((prev) =>
        prev.filter((r) => !(r.groupId === groupId && r.user._id === userId))
      );
    } catch (error) {
      console.error("Failed to reject request:", error);
      toast.error("Failed to reject request");
    }
  };

  /**
   * Handles clicking on a group in the sidebar to select it.
   */
  const SidebarClick = (group: Group) => {
    setSelectedGroup?.(group);
  };

  return (
    <div className="space-y-2 px-2">
      {/* Display Join Requests */}
      {joinRequests.length > 0 && (
        <>
          <div className="text-sm font-semibold text-muted-foreground pt-2">
            Group Join Requests
          </div>
          {joinRequests.map((req, index) => (
            <div
              key={req.user._id || index} // Use req.user._id as key for stability
              className="flex items-center justify-between p-2 bg-yellow-50 dark:bg-yellow-900 rounded-md"
            >
              <div className="flex items-center">
                <Avatar className="h-9 w-9 mr-2">
                  <AvatarFallback>{req.user.firstName?.[0] || "U"}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">
                    {req.user.firstName} {req.user.lastName}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    wants to join <strong>{req.groupName}</strong>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  className="text-xs px-2 py-1"
                  onClick={() => handleAcceptRequest(req.groupId, req.user._id)} // Pass req.user._id
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="text-xs px-2 py-1"
                  onClick={() => handleRejectRequest(req.groupId, req.user._id)} // Pass req.user._id
                >
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Display Groups */}
      <div className="text-sm font-semibold text-muted-foreground pt-4">Groups</div>
      {groups.map((group) => (
        <div
          key={group._id}
          onClick={() => SidebarClick(group)}
          className="flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer"
        >
          <Avatar className="h-9 w-9">
            <AvatarFallback>{group.name?.[0] || "G"}</AvatarFallback>
          </Avatar>

          <div className="font-medium">{group.name}</div>
        </div>
      ))}
      {groups.length === 0 && (
        <div className="text-xs text-muted-foreground px-2">No groups found.</div>
      )}
    </div>
  );
};

export default GroupSidebar;
