import React, { useState } from "react";
import ContactSidebar from "@/components/community/ChatSystemComponent/ContactSidebar";
import ChatBox from "@/components/community/ChatSystemComponent/ChatBox";
import { useSocket } from "@/SocketContext";

const ChatSystem = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [lastActiveUserId, setLastActiveUserId] = useState<string | null>(null);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser).user : null;

  const socket = useSocket(); // ✅ shared socket from context
const [lastMessageMap, setLastMessageMap] = useState({});

function updateLastMessage(userId, message, timestamp) {
  setLastMessageMap((prev) => ({
    ...prev,
    [userId]: { message, timestamp },
  }));
}

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center text-gray-700 dark:text-gray-300 px-4">
        <h1 className="text-3xl font-semibold mb-2">Login Required</h1>
        <p className="text-sm max-w-md mb-4">
          You must be logged in to access the community chat system.
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ContactSidebar
        requests={[]} 
        currentUser={user}
        setSelectedUser={(u) => {
          setSelectedUser(u);
          setSelectedGroup(null);
        }}
          updateLastMessage={updateLastMessage}
            lastMessageMap={lastMessageMap}
        setSelectedGroup={(group) => {
          setSelectedGroup(group);
          setSelectedUser(null);
        }}
        selectedUser={selectedUser}
        socket={socket}
      />
      <div className="md:col-span-2">
        {selectedUser || selectedGroup ? (
          <ChatBox
            currentUser={user}
            selectedUser={selectedUser}
            selectedGroup={selectedGroup}
            socket={socket}
              updateLastMessage={updateLastMessage}
            onMessageSent={(id) => setLastActiveUserId(id)}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a user or group to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSystem;
















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ContactSidebar from "@/components/community/ChatSystemComponent/ContactSidebar";
// import ChatBox from "@/components/community/ChatSystemComponent/ChatBox";
// import { collection, onSnapshot, query, Timestamp, orderBy ,where } from "firebase/firestore";
// import { db } from "../../../firebase";
// import {getDocs, writeBatch } from "firebase/firestore";
// import { updateDoc, doc } from "firebase/firestore";
// export const ENV = {
//   BASE_URL: import.meta.env.VITE_URL || "http://localhost:3000",
// };
// const ChatSystem = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const storedUser = localStorage.getItem("user");
//   const currentUser = storedUser ? JSON.parse(storedUser) : null;
//   const currentUserEmail = currentUser?.email;
//   const [unreadMap, setUnreadMap] = useState<Record<string, number>>({});
//   const [lastActiveUserId, setLastActiveUserId] = useState<string | null>(null);
//   const [lastMap, setLastMessageMap] = useState<Record<string, number>>({});


// console.log("📩 Current user ID:", currentUser.id)
//     console.log("📩 Selected user ID:", selectedUser?.id);
// useEffect(() => {
//   if (!currentUser?.id) return;

//   const q = query(
//     collection(db, "messages"),
//     where("participants", "array-contains", currentUser.id),
//     orderBy("timestamp", "asc")
//   );

//   const unsubscribe = onSnapshot(q, async (snapshot) => {
//     const unreadCounts: Record<string, number> = {};
//     const lastMap: Record<string, number> = {};
//     const unreadForSelectedUser: string[] = [];

//     console.log("📩 Snapshot received. Total messages:", snapshot.docs.length);

//     snapshot.docs.forEach((docSnap) => {
//       const msg = docSnap.data();
//       const { senderId, receiverId, timestamp, read } = msg;
//       const otherUserId = senderId === currentUser.id ? receiverId : senderId;
//       const time = timestamp?.toMillis?.() || new Date(timestamp).getTime();

//       // console.log(" Message", {
//       //   senderId,
//       //   receiverId,
//       //   read,
//       //   time,
//       //   otherUserId,
//       // });

//       if (!lastMap[otherUserId] || time > lastMap[otherUserId]) {
//         lastMap[otherUserId] = time;
//       }

//       if (
//         receiverId === currentUser.id &&
//         !read &&
//         selectedUser?.id !== senderId
//       ) {
//         unreadCounts[senderId] = (unreadCounts[senderId] || 0) + 1;
//       }

//       if (
//         selectedUser &&
//         senderId === selectedUser.id &&
//         receiverId === currentUser.id &&
//         !read
//       ) {
//         unreadForSelectedUser.push(docSnap.id);
//       }
//     });

//     setLastMessageMap({ ...lastMap });
//     setUnreadMap({ ...unreadCounts });

//     // console.log(" Final lastMap:", lastMap);
//     // console.log(" Final unreadCounts:", unreadCounts);

//     if (unreadForSelectedUser.length > 0) {
//       const batch = writeBatch(db);
//       unreadForSelectedUser.forEach((msgId) => {
//         const msgRef = doc(db, "messages", msgId);
//         batch.update(msgRef, { read: true });
//       });
//       await batch.commit();

//       // console.log("✅ Marked messages as read from", selectedUser.id);

//       setUnreadMap((prev) => {
//         const updated = { ...prev };
//         delete updated[selectedUser.id];
//         return updated;
//       });
//     }
//   });

//   return () => unsubscribe();
// }, [currentUser?.id, selectedUser?.id]);



// useEffect(() => {
//     axios
//       .get(`${ENV.BASE_URL}/api/users`)
//       .then((res) => {
//         const filteredUsers = res.data.filter(
//           (user) => user.email !== currentUserEmail
//         );
//         setUsers(filteredUsers);
//       })
//       .catch((err) => console.error("Error fetching users:", err));
//   }, [currentUserEmail]);

// return (
//   <>
//     {!currentUser ? (
//       <div className="flex flex-col items-center justify-center h-[80vh] text-center text-gray-700 dark:text-gray-300 px-4">
//         <h1 className="text-3xl font-semibold mb-2">Login Required</h1>
//         <p className="text-sm max-w-md mb-4">
//           You must be logged in to access the community chat system. Please log in to continue chatting with users.
//         </p>
//         <a
//           href="/login"
//           className="bg-forthtech-red hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-all"
//         >
//           Go to Login
//         </a>
//       </div>
//     ) : (
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <ContactSidebar
//           unreadMap={unreadMap}
//           currentUser={currentUser}
//           users={users}
//           lastMessageMap={lastMap}
//           setSelectedUser={(user) => {
//             setSelectedUser(user);
//           }}
//           lastActiveUserId={lastActiveUserId}
//         />
//         <div className="md:col-span-2">
//           {selectedUser ? (
//             <ChatBox
//               currentUser={currentUser}
//               selectedUser={selectedUser}
//               onMessageSent={(userId) => setLastActiveUserId(userId)}
//             />
//           ) : (
//             <div className="flex items-center justify-center h-full text-muted-foreground">
//               Select a user to start chatting
//             </div>
//           )}
//         </div>
//       </div>
//     )}
//   </>
// );

// };

// export default ChatSystem;



// // import React, { useEffect, useState, useRef } from 'react';
// // import { io, Socket } from 'socket.io-client';

// // interface Message {
// //   sender: string;
// //   message: string;
// //   timestamp: string;
// // }

// // interface PublicChatProps {
// //   currentUser: { name: string; id: string };
// // }

// // const socket: Socket = io('http://localhost:5000'); // ✅ Change to your backend URL

// // const ChatSystem: React.FC<PublicChatProps> = ({ currentUser }) => {
// //   const [chat, setChat] = useState<Message[]>([]);
// //   const [message, setMessage] = useState<string>('');
// //   const chatEndRef = useRef<HTMLDivElement>(null);

// //   useEffect(() => {
// //     socket.on('public-chat-history', (messages: Message[]) => {
// //       setChat(messages);
// //     });

// //     socket.on('public-message', (msg: Message) => {
// //       setChat((prev) => [...prev, msg]);
// //     });

// //     return () => {
// //       socket.off('public-chat-history');
// //       socket.off('public-message');
// //     };
// //   }, []);

// //   useEffect(() => {
// //     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //   }, [chat]);

// //   const sendMessage = () => {
// //     if (message.trim()) {
// //       socket.emit('public-message', {
// //         sender: currentUser?.name || 'Anonymous',
// //         message,
// //       });
// //       setMessage('');
// //     }
// //   };

// //   return (
// //     <div className="p-4 border rounded max-w-2xl mx-auto mt-4">
// //       <h2 className="text-2xl font-bold mb-4">🌐 Public Chat</h2>
// //       <div className="h-96 overflow-y-auto border p-3 mb-4 bg-gray-100 rounded">
// //         {chat.map((msg, i) => (
// //           <div key={i} className="mb-2">
// //             <span className="font-semibold text-blue-700">{msg.sender}:</span>{' '}
// //             <span>{msg.message}</span>
// //           </div>
// //         ))}
// //         <div ref={chatEndRef} />
// //       </div>
// //       <div className="flex gap-2">
// //         <input
// //           className="flex-1 border p-2 rounded"
// //           value={message}
// //           onChange={(e) => setMessage(e.target.value)}
// //           placeholder="Type your message..."
// //         />
// //         <button
// //           onClick={sendMessage}
// //           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
// //         >
// //           Send
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatSystem;
