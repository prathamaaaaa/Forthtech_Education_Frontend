


import React, { useMemo, useState ,useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, UserPlus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InviteUsersPopup from "@/components/community/ChatSystemComponent/ChatWrapper";
import axios from "axios";
import { Check, X } from "lucide-react";
import { io, Socket } from "socket.io-client";
import { toast } from 'sonner';
import GroupSidebar from "@/components/community/StudyGoupComponent/GroupSidebar";

import { useRef } from "react";
// import socket from "@/lib/socket";
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  
}

interface Group {
  _id: string;
  name: string;
  // Add other fields if needed
}
interface ChatSidebarProps {
  requests: User[];
  // setSelectedUser: (user: User) => void;
  currentUser: User;
  selectedUser?: User | null;
  socket: Socket | null;
    setSelectedUser: (user: User | null) => void;
  setSelectedGroup: (group: Group | null) => void;
    lastMessageMap: Record<string, { message: string; timestamp: number }>;
  updateLastMessage: (userId: string, message: string, timestamp: number) => void;
  
  // unreadMap: Record<string, number>;

  // lastMessageMap: Record<string, number>; 
}

const ContactSidebar: React.FC<ChatSidebarProps> = ({
  setSelectedUser,
  currentUser,
  selectedUser,
  socket,
    setSelectedGroup,
      lastMessageMap,
  updateLastMessage,

  // unreadMap,
  // lastMessageMap,
}) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [followedUsers, setFollowedUsers] = useState<User[]>([]);
  const [requests, setRequests] = useState<User[]>([]);
const [loading, setLoading] = useState(true);
console.log("Current user:", currentUser);
console.log("Socket instance:", socket);
// const [messages, setMessages] = useState<any[]>([]); 
// const socketRef = useRef<Socket | null>(null);
const [unreadMap, setUnreadMap] = useState<Record<string, number>>({});
// const [lastMessageMap, setLastMessageMap] = useState<Record<string, number>>({});
// const [selectedUser, setSelectedUser] = useState<User | null>(null);
const selectedUserRef = useRef<User | null>(null);
useEffect(() => {
  selectedUserRef.current = selectedUser;
}, [selectedUser]);
// const [lastMessageMap, setLastMessageMap] = useState<Record<
//   string,
//   { message: string; timestamp: number }
// >>({});


  const ENV = {
    BASE_URL: import.meta.env.VITE_URL || "http://localhost:5000"
  };


const refreshContactsAndRequests = async () => {
  try {
    setLoading(true);

    // Fetch latest contacts
    const resContacts = await axios.get(`${ENV.BASE_URL}/api/users/${currentUser.id}/contacts-with-last-message`);
    const contacts = resContacts.data;

    contacts.forEach(contact => {
      if (contact.lastMessage) {
        updateLastMessage(contact.id, contact.lastMessage.message, contact.lastMessage.timestamp);
      }
    });
    setFollowedUsers(contacts);

    // Fetch pending requests
    const resUser = await axios.get(`${ENV.BASE_URL}/api/users/${currentUser.id}`);
    const requestList = resUser.data.requestList || [];

    const pendingUserIds = requestList
      .filter(req => req.status === "pending")
      .map(req => req.user._id);

    const pendingUsers = await Promise.all(
      pendingUserIds.map(id =>
        axios.get(`${ENV.BASE_URL}/api/users/${id}`).then(res => ({
          ...res.data,
          id: res.data._id
        }))
      )
    );
    setRequests(pendingUsers);

  } catch (err) {
    console.error("❌ Failed to refresh contacts and requests:", err);
  } finally {
    setLoading(false);
  }
};






useEffect(() => {
  if (!socket) return;

  const handleReceiveMessage = (msg) => {
    const { senderId } = msg;

    const isCurrentChatOpen = selectedUser?.id === senderId;

    if (!isCurrentChatOpen) {
      setUnreadMap((prev) => ({
        ...prev,
        [senderId]: (prev[senderId] || 0) + 1,
      }));
    } else {
      setUnreadMap((prev) => ({
        ...prev,
        [senderId]: 0,
      }));
    }

    // setLastMessageMap((prev) => ({
    //   ...prev,
    //   [senderId]: {
    //     message: msg.message,
    //     timestamp: new Date(msg.timestamp).getTime(),
    //   },
    // }));

    console.log("📥 Message received from:", senderId, msg.message);
  };




// const handleReceiveMessage = (msg) => {
//   const { senderId } = msg;
//   const isCurrentChatOpen = selectedUserRef.current?.id === senderId;

//   updateLastMessage(senderId, msg.message, Date.now());

//   updateLastMessage(currentUser.id, msg.message, Date.now());

//   setUnreadMap((prev) => ({
//     ...prev,
//     [senderId]: isCurrentChatOpen ? 0 : (prev[senderId] || 0) + 1
//   }));

//   setFollowedUsers((users) => [...users]);
// };



  socket.on("receive-message", handleReceiveMessage);

  return () => {
    socket.off("receive-message", handleReceiveMessage);
  };
}, [socket, selectedUser]);




useEffect(() => {
  if (!selectedUser) return;

  setUnreadMap((prev) => ({
    ...prev,
    [selectedUser.id]: 0,
  }));
}, [selectedUser]);



// useEffect(() => {
//   const fetchUserDetails = async () => {
//     try {
//         setLoading(true);
//       const response = await axios.get(`${ENV.BASE_URL}/api/users/${currentUser.id}`);
//       if (response.status === 200) {
//         const requestObjs = response.data.requestList || [];
//         const followIds = response.data.followList || [];

//         // Filter only pending requests (sent to current user)
//         const pendingRequestUserIds = requestObjs
//           .filter((req: any) => req.status === 'pending')
//           .map((req: any) => req.user);

//         const requestUserPromises = pendingRequestUserIds.map((id: string) =>
//           axios.get(`${ENV.BASE_URL}/api/users/${id}`).then((res) => ({
//             ...res.data,
//             id: res.data._id,
//           }))
//         );
//         const requestUsers = await Promise.all(requestUserPromises);
//         setRequests(requestUsers);

//         // Followed users
//         const followUserPromises = followIds.map((id: string) =>
//           axios.get(`${ENV.BASE_URL}/api/users/${id}`).then((res) => ({
//             ...res.data,
//             id: res.data._id,
//           }))
//         );
//         const followUsers = await Promise.all(followUserPromises);
//         setFollowedUsers(followUsers);
//       }
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//     }finally {
//       setLoading(false); 
//     }
//   };

//   fetchUserDetails();
// }, [currentUser.id]);



useEffect(() => {
  const fetchUserDetails = async () => {
    try {
      setLoading(true);

      // 🚀 Call new API
      const response = await axios.get(`${ENV.BASE_URL}/api/users/${currentUser.id}/contacts-with-last-message`);
      const contacts = response.data;

      // 🔥 Build last message map
      // const newLastMessageMap = {};
      // contacts.forEach(contact => {
      //   if (contact.lastMessage) {
      //     newLastMessageMap[contact.id] = {
      //       message: contact.lastMessage.message,
      //       timestamp: contact.lastMessage.timestamp
      //     };
      //   }
      // });


      contacts.forEach(contact => {
  if (contact.lastMessage) {
    updateLastMessage(contact.id, contact.lastMessage.message, contact.lastMessage.timestamp);
  }
});

      // setLastMessageMap(newLastMessageMap);
  // updateLastMessage(currentUser.id, message, Date.now());

      setFollowedUsers(contacts);
    } catch (error) {
      console.error("❌ Error fetching contacts with last message:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchUserDetails();
}, [currentUser.id]);



// function updateLastMessage(userId, message, timestamp) {
//   setLastMessageMap((prev) => {
//     const newMap = {
//       ...prev,
//       [userId]: { message, timestamp },
//     };
//     setFollowedUsers((users) => [...users]);
//     return newMap;
//   });
// }
// function updateLastMessage(userId, message, timestamp) {
//   setLastMessageMap((prev) => ({
//     ...prev,
//     [userId]: { message, timestamp },
//   }));
//   setFollowedUsers((users) => [...users]); // force UI recompute
// }




const handleAccept = async (userId: string) => {
  try {
    await axios.post(`${ENV.BASE_URL}/api/users/accept-request`, {
      fromId: userId,
      toId: currentUser.id,
    });

    setRequests((prev) => prev.filter((u) => u.id !== userId));

    const res = await axios.get(`${ENV.BASE_URL}/api/users/${userId}`);
    const acceptedUser = { ...res.data, id: res.data._id };

    setFollowedUsers((prev) => [...prev, acceptedUser]);
  updateLastMessage(acceptedUser.id, "", Date.now());
    socket.emit("contact-accepted", {
      fromId: currentUser.id,
      toId: userId,
      user: {
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
      },
    });


    toast.success(`${acceptedUser.firstName} is now in your contacts`);
        await refreshContactsAndRequests();
  } catch (error) {
    console.error("Error accepting request:", error);
  }
};





useEffect(() => {
  if (!socket) return;

  const handleContactAccepted = async ({ fromId, toId, user }) => {
    console.log("🤝 Contact accepted event:", { fromId, toId, user });

    // If this is about the current user, refresh their sidebar
    if (currentUser.id === toId || currentUser.id === fromId) {
      await refreshContactsAndRequests();
    }
  };

  socket.on("contact-accepted", handleContactAccepted);

  return () => {
    socket.off("contact-accepted", handleContactAccepted);
  };
}, [socket, currentUser.id]);




useEffect(() => {
  if (!socket) return;
  const handleSystemMessage = (msg) => {
  if (msg?.type === "system") {
    const otherId = msg.fromId === currentUser.id ? msg.toId : msg.fromId;
    updateLastMessage(otherId, msg.message, Date.now());
    toast.success(msg.message);
  }
};


  socket.on("system-message", handleSystemMessage);
  console.log("📩 Setting up socket for system messages with user ID:", currentUser.id);
  return () => {
    socket.off("system-message", handleSystemMessage);
  };
}, [socket, currentUser.id]);



const handleRemove = async (userId: string) => {
  console.log("Removing request for user:", userId);
  try {
    await axios.post(`${ENV.BASE_URL}/api/users/remove-request`, {
      fromId: userId,
      toId: currentUser.id,
    });

    setRequests((prev) => prev.filter((u) => u.id !== userId));
    console.log("Request removed:", userId);
  } catch (error) {
    console.error("Error removing request:", error);
  }
};

  const filteredRequests = useMemo(() => {
    return requests.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return fullName.includes(search.toLowerCase());
      console.log(requests)
    });
  }, [requests, search]);

const sortedUsers = useMemo(() => {
  return followedUsers
    .filter((user) => user.id !== currentUser.id)
    .filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return fullName.includes(search.toLowerCase());
    })
    // .sort((a, b) => {
    //   const lastA = lastMessageMap[a.id]?.timestamp || 0;
    //   const lastB = lastMessageMap[b.id]?.timestamp || 0;
    //   return lastB - lastA;
    // });
    .sort((a, b) => {
  const unreadA = unreadMap[a.id] > 0 ? 1 : 0;
  const unreadB = unreadMap[b.id] > 0 ? 1 : 0;

  if (unreadA !== unreadB) {
    return unreadB - unreadA; // Unread first
  }

  const lastA = lastMessageMap[a.id]?.timestamp || 0;
  const lastB = lastMessageMap[b.id]?.timestamp || 0;
  return lastB - lastA;
});

}, [followedUsers, lastMessageMap, unreadMap, socket,search, currentUser.id]);


  // const handleUserClick = (user: User) => {
  //   setSelectedUser(user);
  // };

const handleUserClick = async (user: User) => {
  setSelectedUser(user);

  try {
    await axios.patch(`${ENV.BASE_URL}/api/messages/read`, {
      senderId: user.id,
      receiverId: currentUser.id
    });

    setUnreadMap((prev) => ({
      ...prev,
      [user.id]: 0
    }));

    // (Optional) emit socket event to notify sender
    socket?.emit("mark-messages-read", {
      senderId: user.id,
      receiverId: currentUser.id
    });

    console.log(`Marked messages from ${user.firstName} as read`);
  } catch (err) {
    console.error("Failed to mark messages as read:", err);
  }
};





  function invite() {
    setShowInviteModal(true);
    console.log("Invite button clicked");
  }


useEffect(() => {
  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get(`${ENV.BASE_URL}/api/users/${currentUser.id}`);
      const requestList = response.data.requestList || [];

      console.log("Loaded requestList from DB:", requestList);

      // ✅ only requests with status === "pending"
      const pendingUserIds = requestList
        .filter(req => req.status === "pending")
        .map(req => req.user._id);

      console.log("Pending user IDs:", pendingUserIds);

      const pendingUsers = await Promise.all(
        pendingUserIds.map(id =>
          axios.get(`${ENV.BASE_URL}/api/users/${id}`).then(res => ({
            ...res.data,
            id: res.data._id
          }))
        )
      );

      console.log("Pending user details:", pendingUsers);
      setRequests(pendingUsers);
    } catch (err) {
      console.error("❌ Error loading pending requests:", err);
    }
  };

  fetchPendingRequests();
}, [currentUser.id]);



useEffect(() => {
  if (!socket) return;

  console.log("🟢 Socket listener set for receive-invite");

  const handleReceiveInvite = async ({ fromId }) => {
    try {
      console.log("📬 New invite received from:", fromId);

      const response = await axios.get(`${ENV.BASE_URL}/api/users/${currentUser.id}`);
      const requestList = response.data.requestList || [];
      console.log("bacwefjrgnkjgkjsfnjrkfnk")
      const pendingUserIds = requestList
        .filter(req => req.status === "pending")
        .map(req => req.user._id);

      console.log("🔎 Pending user IDs from DB:", pendingUserIds);

      // Fetch details for each pending user
      const pendingUsers = await Promise.all(
        pendingUserIds.map(id =>
          axios.get(`${ENV.BASE_URL}/api/users/${id}`)
            .then(res => ({
              id: res.data._id,
              firstName: res.data.firstName || "Unknown",
              lastName: res.data.lastName || "",
              email: res.data.email || "No Email",
            }))
            .catch(err => {
              console.error(`❌ Failed to load user ${id}`, err);
              return null;
            })
        )
      );

      const validPendingUsers = pendingUsers.filter(u => u !== null);
      console.log("✅ Fetched valid pending users:", validPendingUsers);

      // Merge without duplicates
      setRequests(prev => {
        const existingIds = new Set(prev.map(u => u.id));
        const newUnique = validPendingUsers.filter(u => !existingIds.has(u.id));
        const merged = [...prev, ...newUnique];
        console.log("💾 Updated requests list:", merged);
        return merged;
      });

      toast.success("🎉 You received a new contact request!");

    } catch (err) {
      console.error("❌ Failed to process new invite:", err);
    }
  };

  socket.on("receive-invite", handleReceiveInvite);

  return () => {
    console.log("🔴 Cleaning up receive-invite listener");
    socket.off("receive-invite", handleReceiveInvite);
  };
}, [socket, currentUser?.id]);











  const renderUser = (user: User, isRequest: boolean = false) => (
 <div
  key={user.id}
  className={`flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer ${
    isRequest ? "bg-yellow-50 dark:bg-yellow-900" : ""
  }`}
  onClick={() => !isRequest && handleUserClick(user)} // prevent click for request
>
  <div className="flex items-center">
    <Avatar className="h-10 w-10 mr-3">
      <AvatarImage src="https://github.com/shadcn.png" alt={user.firstName} />
      <AvatarFallback>{user.firstName[0]}</AvatarFallback>
    </Avatar>
    <div>
      <div className="font-medium">{user.firstName} {user.lastName}</div>
      <div className="text-xs text-muted-foreground">{user.email}</div>
    </div>
  </div>






{/* {isRequest ? (

  <div className="flex gap-1">
    <Button
      size="sm"
      className="text-xs px-2 py-1 flex items-center justify-center"
      onClick={(e) => {
        e.stopPropagation();
        handleAccept(user.id);
      }}
    >
      <span className="hidden md:inline">Accept</span>
      <Check className="md:hidden h-4 w-4" />
    </Button>
    <Button
      size="sm"
      variant="destructive"
      className="text-xs px-2 py-1 flex items-center justify-center"
      onClick={(e) => {
        e.stopPropagation();
        handleRemove(user.id);
      }}
    >
      <span className="hidden md:inline">Remove</span>
      <X className="md:hidden h-4 w-4" />
    </Button>
  </div>
) : unreadMap[user.id] > 0 ? (
  <div className="ml-2 bg-gray-500 text-white text-xs px-2 py-0.5 rounded-full">
    {unreadMap[user.id]}
  </div>
) : null} 

 */}

</div>

  );

  return (
    <div className="md:col-span-1">
      <Card className="h-[550px]">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-xl flex items-center">
              <Users className="mr-2 h-5 w-5 text-forthtech-red" />
              Contacts
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={invite} className="rounded-full">
              <UserPlus className="h-5 w-5" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>

        <CardContent className="h-[calc(100%-120px)] overflow-y-auto">

            {loading ? (
    <div className="text-center text-muted-foreground mt-6">Loading contacts...</div>
  ) : (
          <div className="space-y-2">
            {/* {filteredRequests.length > 0 && (
              <>
                <div className="text-sm font-semibold text-muted-foreground px-2 pt-2">
                  Requests
                </div>
                {filteredRequests.map((user) => renderUser(user, true))}
              </>
            )} */}


{requests.length > 0 && (
  <>
    <div className="text-sm font-semibold text-muted-foreground mb-2">
      Pending Requests
    </div>
    {requests.map((user) => (
      <div
        key={user.id}
        className="flex justify-between items-center mb-2 bg-yellow-50 dark:bg-yellow-900 px-3 py-2 rounded"
      >
        <div>
          {user.firstName} {user.lastName}
          <div className="text-xs text-muted-foreground">{user.email}</div>
        </div>
        <div className="flex gap-1">
          <Button
            size="sm"
            className="text-xs px-2 py-1 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              handleAccept(user.id);
            }}
          >
            <span className="hidden md:inline">Accept</span>
            <Check className="md:hidden h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="text-xs px-2 py-1 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              handleRemove(user.id);
            }}
          >
            <span className="hidden md:inline">Remove</span>
            <X className="md:hidden h-4 w-4" />
          </Button>
        </div>
      </div>
    ))}
    <div className="my-3 border-b border-gray-300 dark:border-gray-700"></div>
  </>
)}





<GroupSidebar
  socket={socket}
  currentUserId={currentUser.id}
  setSelectedGroup={setSelectedGroup}
/>


            {sortedUsers.length > 0 && (
              <>
                <div className="text-sm font-semibold text-muted-foreground px-2 pt-4">
                  Chats
                </div>
                {sortedUsers.map((user) => renderUser(user))}
              </>
            )}

            {filteredRequests.length === 0 && sortedUsers.length === 0 && (
              <div className="text-center text-muted-foreground mt-6">
                No contacts found.
              </div>
            )}
          </div>
        )}

        </CardContent>

      </Card>

      {showInviteModal && (
     <InviteUsersPopup
  currentUser={currentUser}
  onClose={() => setShowInviteModal(false)}
  socket={socket}
  requests={requests}
/>

      )}
    </div>
  );
};

export default ContactSidebar;
