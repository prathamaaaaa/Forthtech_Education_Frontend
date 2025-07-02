import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import axios from "axios";
import { toast } from 'sonner';
import MessageList from "./ChatBoxComponent/MessageList";
import MessageInput from "./ChatBoxComponent/MessageInput";
import SelectedMediaModal from "./ChatBoxComponent/SelectedMediaModal";
import GroupDetailsModal from "./ChatBoxComponent/GroupDetailsModal";

export const ENV = {
  BASE_URL: import.meta.env.VITE_URL || "http://localhost:5000",
};

const ChatBox = ({ currentUser, selectedUser, selectedGroup,updateLastMessage , onMessageSent, socket }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showGroupDetails, setShowGroupDetails] = useState(false);

  const [selectMode, setSelectMode] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);

  const messagesEndRef = useRef(null);
  const menuRef = useRef(null);
  const emojiRef = useRef(null);

  const isGroupChat = !!selectedGroup;

  useEffect(() => {
    if (isGroupChat && selectedGroup?._id && socket) {
      socket.emit("join-group", { groupId: selectedGroup._id });
    }
  }, [selectedGroup?._id, socket]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowDeleteMenu(false);
      }
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeleteSelected = async (forEveryone) => {
    if (selectedMessages.length === 0) return;
    try {
      await axios.post(`${ENV.BASE_URL}/api/users/delete-multiple`, {
        ids: selectedMessages, userId: currentUser.id, forEveryone
      });
      setMessages((prev) => prev.filter((m) => !selectedMessages.includes(m._id)));
      if (forEveryone) {
        socket.emit("delete-messages", { ids: selectedMessages });
      }
      setSelectedMessages([]);
      setSelectMode(false);
    } catch (err) {
      console.error("Failed to delete messages", err);
    }
  };

  const sendMessage = async () => {
    if (!text.trim() && !selectedFile) return;
    let fileUrl = "", fileType = "";
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const res = await axios.post(`${ENV.BASE_URL}/api/upload`, formData);
        fileUrl = res.data.fileUrl;
        fileType = res.data.fileType;
      } catch {
        toast.error("Upload failed"); return;
      }
    }
    const newMsg = {
      senderId: currentUser.id,
      message: text || "",
      fileUrl, fileType,
      read: false,
      timestamp: new Date().toISOString(),
      groupId: isGroupChat ? selectedGroup._id : null,
      receiverId: isGroupChat ? null : selectedUser.id,
      visibleTo: isGroupChat 
        ? [selectedGroup.creator._id, ...selectedGroup.members.map((m) => m._id || m)]
        : [selectedUser.id],
    };
    if (isGroupChat) socket?.emit("send-group-message", newMsg);
    else {
      socket?.emit("send-message", newMsg);
      setMessages((prev) => [...prev, newMsg]);
      // onMessageSent(selectedUser.id);
      onMessageSent(selectedUser.id, text, Date.now());
          updateLastMessage(selectedUser.id, text, Date.now()); // <-- add this


    }
    setText(""); setSelectedFile(null);
  };

  useEffect(() => {
    if (!currentUser || !socket || (!selectedUser && !selectedGroup)) return;

    const loadMessages = () => {
      if (isGroupChat) {
        socket.emit("load-group-messages", { groupId: selectedGroup._id, userId: currentUser.id });
      } else {
        socket.emit("load-messages", { currentUserId: currentUser.id, selectedUserId: selectedUser.id });
      }
    };

    // const handleHistory = (msgs) => {
    //   setMessages(msgs);
    //   if (!isGroupChat) {
    //     axios.patch(`${ENV.BASE_URL}/api/messages/read`, {
    //       senderId: selectedUser.id, receiverId: currentUser.id
    //     }).then(loadMessages);
    //   }
    // };

const handleHistory = (msgs) => {
  setMessages(msgs);
};


    // const handleReceiveMessage = (msg) => {
    //   if (isGroupChat) {
    //     if (msg.groupId === selectedGroup._id) setMessages((p) => [...p, msg]);
    //   } else {
    //     const isForMe = msg.receiverId === currentUser.id && msg.senderId === selectedUser.id;
    //     const isFromMe = msg.senderId === currentUser.id && msg.receiverId === selectedUser.id;
    //     if (isForMe) {
    //       axios.patch(`${ENV.BASE_URL}/api/messages/read`, {
    //         senderId: selectedUser.id, receiverId: currentUser.id
    //       }).then(() => {
    //         msg.read = true;
    //         setMessages((p) => [...p, msg]);
    //       });
    //     } else if (isFromMe) setMessages((p) => [...p, msg]);
    //   }
    // };


    const handleReceiveMessage = (msg) => {
  if (isGroupChat) {
    if (msg.groupId === selectedGroup._id) {
      setMessages((p) => [...p, msg]);
    }
  } else {
    const isForMe = msg.receiverId === currentUser.id && msg.senderId === selectedUser.id;
    const isFromMe = msg.senderId === currentUser.id && msg.receiverId === selectedUser.id;

    if (isForMe || isFromMe) {
      setMessages((p) => [...p, msg]);
    }
  }
};
    const handleDeleteMessages = ({ ids }) => {
      setMessages((prev) => prev.filter((m) => !ids.includes(m._id)));
    };

    socket.off("message-history").off("receive-message")
      .off("group-message-history").off("receive-group-message").off("delete-messages");

    if (isGroupChat) {
      socket.on("group-message-history", handleHistory);
      socket.on("receive-group-message", handleReceiveMessage);
    } else {
      socket.on("message-history", handleHistory);
      socket.on("receive-message", handleReceiveMessage);
    }
    socket.on("delete-messages", handleDeleteMessages);
    loadMessages();

    return () => {
      socket.off("message-history").off("receive-message")
        .off("group-message-history").off("receive-group-message")
        .off("delete-messages");
    };
  }, [selectedUser?.id, selectedGroup?._id, currentUser?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const title = isGroupChat ? selectedGroup.name : `${selectedUser.firstName} ${selectedUser.lastName}`;
  const subtitle = isGroupChat ? "Group Chat" : selectedUser.email;

  return (
    <Card className="h-[550px] flex flex-col">
      <CardHeader className="pb-2 flex-row justify-between items-center">
        <div
          className={`flex items-center ${isGroupChat ? "cursor-pointer hover:opacity-80" : ""}`}
          onClick={() => isGroupChat && setShowGroupDetails(true)}
        >
          <Avatar className="h-10 w-10 mr-3">
            <AvatarFallback>{title[0]}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{title}</CardTitle>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        {!selectMode ? (
          <div className="relative inline-block text-left">
            <Button variant="ghost" size="icon" onClick={() => setShowDeleteMenu((p) => !p)}>
              <MoreVertical className="h-5 w-5" />
            </Button>
            {showDeleteMenu && (
              <div ref={menuRef} className="absolute z-50 mt-2 right-0 w-44 bg-white shadow-lg rounded border text-sm">
                <button onClick={() => { setSelectMode(true); setShowDeleteMenu(false); }} className="w-full px-4 py-2 text-left hover:bg-gray-100">
                  Select Messages
                </button>
                {isGroupChat && (
                  <button onClick={() => toast("Handle leave group here")} className="w-full px-4 py-2 text-left hover:bg-red-100 text-red-600">
                    Leave Group
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <Button variant="destructive" size="sm" onClick={() => handleDeleteSelected(false)}>Delete for me ({selectedMessages.length})</Button>
            <Button variant="destructive" size="sm" onClick={() => handleDeleteSelected(true)}>Delete for everyone ({selectedMessages.length})</Button>
            <Button variant="outline" size="sm" onClick={() => { setSelectMode(false); setSelectedMessages([]); }}>Cancel</Button>
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
        <MessageList {...{messages, currentUser, selectedUser, selectedGroup, isGroupChat, selectMode, selectedMessages, setSelectedMessages, setSelectedMedia}} />
        <div ref={messagesEndRef} />
      </CardContent>

      <MessageInput {...{text, setText, showEmojiPicker, setShowEmojiPicker, showAttachmentMenu, setShowAttachmentMenu, selectedFile, setSelectedFile, sendMessage, emojiRef}} />
      <SelectedMediaModal selectedMedia={selectedMedia} setSelectedMedia={setSelectedMedia} />
      {showGroupDetails && <GroupDetailsModal {...{selectedGroup, currentUser, setShowGroupDetails}} />}
    </Card>
  );
};

export default ChatBox;
















// // import React from "react";
// // import { Card } from "@/components/ui/card";
// // import ChatHeader from "./ChatBoxComponent/ChatHeader";
// // import MessageList from "./ChatBoxComponent/MessageList";
// // import ChatInput from "./ChatBoxComponent/ChatInput";
// // import useChatLogic from "./ChatBoxComponent/useChatLogic";
// // const ChatBox = ({ currentUser, selectedUser, selectedGroup, onMessageSent, socket }) => {
// //   const chatProps = useChatLogic({ currentUser, selectedUser, selectedGroup, onMessageSent, socket });

// //   console.log("ChatProps:", chatProps);

// //   return (
// //     <Card className="h-[550px] flex flex-col">
// //       <ChatHeader {...chatProps} />
// //       <MessageList {...chatProps} />
// //       <ChatInput {...chatProps} />
// //     </Card>
// //   );
// // };


// // export default ChatBox;


// import React, { useEffect, useRef, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { MessageSquare, Check, CheckCheck ,MoreVertical ,Paperclip } from "lucide-react";
// import Picker from "@emoji-mart/react";
// import data from "@emoji-mart/data";
// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { group } from "console";
// import { toast } from 'sonner';

// export const ENV = {
//   BASE_URL: import.meta.env.VITE_URL || "http://localhost:5000",
// };

// const ChatBox = ({ currentUser, selectedUser, selectedGroup, onMessageSent, socket }) => {
//   const [text, setText] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const messagesEndRef = useRef(null);
// const [selectMode, setSelectMode] = useState(false);
// const [selectedMessages, setSelectedMessages] = useState([]);
// const [showDeleteMenu, setShowDeleteMenu] = useState(false);
// const menuRef = useRef<HTMLDivElement>(null);
// const emojiRef = useRef<HTMLDivElement>(null);
// const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
// const [selectedFile, setSelectedFile] = useState(null);
// const [selectedMedia, setSelectedMedia] = useState(null);
// const [showGroupDetails, setShowGroupDetails] = useState(false);

// useEffect(() => {
//   if (isGroupChat && selectedGroup?._id && socket) {
//     socket.emit("join-group", { groupId: selectedGroup._id });
//     console.log("📡 Joined group room:", selectedGroup._id);
//   }
// }, [selectedGroup?._id, socket]);


// useEffect(() => {
//   const handleClickOutside = (event: MouseEvent) => {
//     if (
//       menuRef.current && !menuRef.current.contains(event.target as Node) &&
//       emojiRef.current && !emojiRef.current.contains(event.target as Node)
//     ) {
//       setShowDeleteMenu(false);
//       setShowEmojiPicker(false);
//     }

//     // if you want them to close independently (not both at once):
//     if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//       setShowDeleteMenu(false);
//     }
//     if (emojiRef.current && !emojiRef.current.contains(event.target as Node)) {
//       setShowEmojiPicker(false);
//     }
//   };

//   document.addEventListener("mousedown", handleClickOutside);
//   return () => document.removeEventListener("mousedown", handleClickOutside);
// }, []);




// const handleDeleteSelected = async (forEveryone) => {
//   if (selectedMessages.length === 0) return;

//   try {
//     const res = await axios.post(`${ENV.BASE_URL}/api/users/delete-multiple`, {
//       ids: selectedMessages,
//       userId: currentUser.id,
//       forEveryone,
//     });

//     setMessages((prev) => prev.filter((m) => !selectedMessages.includes(m._id)));

//     if (forEveryone) {
//       socket.emit("delete-messages", { ids: selectedMessages });
//     }

//     setSelectedMessages([]);
//     setSelectMode(false); 
//   } catch (err) {
//     console.error("Failed to delete messages", err);
//   }
// };





//   const isGroupChat = !!selectedGroup;


// // const sendMessage = () => {
// //   if (!text.trim()) return;

// //   const newMessage = {
// //     senderId: currentUser.id,
// //     message: text,
// //     read: false,
// //     timestamp: new Date().toISOString(),
// //     groupId: isGroupChat ? selectedGroup._id : null,
// //     receiverId: isGroupChat ? null : selectedUser.id,
// // visibleTo: isGroupChat
// //   ? [selectedGroup.creator._id, ...selectedGroup.members.map((m) => m._id || m)]
// //   : [selectedUser.id],

// //   };

// //   if (isGroupChat) {
// //     socket?.emit("send-group-message", newMessage);
// //   } else {
// //     socket?.emit("send-message", newMessage);
// //     console.log("Sending group message:", newMessage);
// //     setMessages((prev) => [...prev, newMessage]); 
// //     onMessageSent(selectedUser.id);
// //   }

// //   setText("");
// // };





// const sendMessage = async () => {
//   if (!text.trim() && !selectedFile) return;

//   let fileUrl = "";
//   let fileType = "";

//   if (selectedFile) {
//     try {
//       const formData = new FormData();
//       formData.append("file", selectedFile);
//       const res = await axios.post(`${ENV.BASE_URL}/api/upload`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       fileUrl = res.data.fileUrl;
//       fileType = res.data.fileType;
//     } catch (err) {
//       console.error("Upload failed", err);
//       toast.error("Upload failed");
//       return;
//     }
//   }

//   const newMessage = {
//     senderId: currentUser.id,
//     message: text || "",
//     fileUrl,
//     fileType,
//     read: false,
//     timestamp: new Date().toISOString(),
//     groupId: isGroupChat ? selectedGroup._id : null,
//     receiverId: isGroupChat ? null : selectedUser.id,
//     visibleTo: isGroupChat
//       ? [selectedGroup.creator._id, ...selectedGroup.members.map((m) => m._id || m)]
//       : [selectedUser.id],
//   };

//   if (isGroupChat) {
//     socket?.emit("send-group-message", newMessage);
//   } else {
//     socket?.emit("send-message", newMessage);
//     setMessages((prev) => [...prev, newMessage]);
//     onMessageSent(selectedUser.id);
//   }

//   setText("");
//   setSelectedFile(null);
// };













//   const formatTime = (time) =>
//     new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

//   useEffect(() => {
//     if (!currentUser || !socket || (!selectedUser && !selectedGroup)) return;

//     const loadMessages = () => {
//       if (isGroupChat) {
// socket.emit("load-group-messages", {
//   groupId: selectedGroup._id,
//   userId: currentUser.id, 
// });      }
      
//       else {
//         socket.emit("load-messages", {
//           currentUserId: currentUser.id,
//           selectedUserId: selectedUser.id,
//         });
//       }
//     };

//     const handleHistory = (msgs) => {
//       setMessages(msgs);
//       if (!isGroupChat) {
//         axios.patch(`${ENV.BASE_URL}/api/messages/read`, {
//           senderId: selectedUser.id,
//           receiverId: currentUser.id
//         }).then(loadMessages);
//       }
//     };
//   const handleDeleteMessages = ({ ids }) => {
//     setMessages((prev) => prev.filter((m) => !ids.includes(m._id)));
//   };



  
//     const handleReceiveMessage = (msg) => {
//       if (isGroupChat) {
//         if (msg.groupId === selectedGroup._id) {
//           setMessages((prev) => [...prev, msg]);
//         }
//       } else {
//         const isForMe = msg.receiverId === currentUser.id && msg.senderId === selectedUser.id;
//         const isFromMe = msg.senderId === currentUser.id && msg.receiverId === selectedUser.id;

//         if (isForMe) {
//           axios.patch(`${ENV.BASE_URL}/api/messages/read`, {
//             senderId: selectedUser.id,
//             receiverId: currentUser.id
//           }).then(() => {
//             msg.read = true;
//             setMessages((prev) => [...prev, msg]);
//           });
//         } else if (isFromMe) {
//           setMessages((prev) => [...prev, msg]);
//         }
//       }
//     };

//     socket.off("message-history", handleHistory);
//     socket.off("receive-message", handleReceiveMessage);
//     socket.off("group-message-history", handleHistory);
//     socket.off("receive-group-message", handleReceiveMessage);

//     if (isGroupChat) {
//       socket.on("group-message-history", handleHistory);
//       socket.on("receive-group-message", handleReceiveMessage);
//     } else {
//       socket.on("message-history", handleHistory);
//       socket.on("receive-message", handleReceiveMessage);
//     }
//   socket.on("delete-messages", handleDeleteMessages);
//     loadMessages();

//     return () => {
//       socket.off("message-history", handleHistory);
//       socket.off("receive-message", handleReceiveMessage);
//       socket.off("group-message-history", handleHistory);
//       socket.off("receive-group-message", handleReceiveMessage);
//           socket.off("delete-messages", handleDeleteMessages); 
//     };
//   }, [selectedUser?.id, selectedGroup?._id, currentUser?.id]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages.length]);


//   const title = isGroupChat
//     ? selectedGroup.name
//     : `${selectedUser.firstName} ${selectedUser.lastName}`;

//   const subtitle = isGroupChat ? "Group Chat" : selectedUser.email;

//   return (
//     <Card className="h-[550px] flex flex-col">
//       <CardHeader className="pb-2">
//         <div className="flex justify-between items-center">

//         {/* <div className="flex items-center">
//           <Avatar className="h-10 w-10 mr-3">
//             <AvatarFallback>{title[0]}</AvatarFallback>
//           </Avatar>
//           <div>
//             <CardTitle>{title}</CardTitle>
//             <p className="text-xs text-muted-foreground">{subtitle}</p>
//           </div>
//         </div> */}



//         <div
//   className={`flex items-center ${isGroupChat ? "cursor-pointer hover:opacity-80" : ""}`}
//   onClick={() => {
//     if (isGroupChat) {
//       setShowGroupDetails(true);
//     }
//   }}
// >
//   <Avatar className="h-10 w-10 mr-3">
//     <AvatarFallback>{title[0]}</AvatarFallback>
//   </Avatar>
//   <div>
//     <CardTitle>{title}</CardTitle>
//     <p className="text-xs text-muted-foreground">{subtitle}</p>
//   </div>
// </div>

// <div className="flex gap-2">
//   {!selectMode ? (
//     // when NOT selecting, show 3 dots
//     <div className="relative inline-block text-left">
//       <Button variant="ghost" size="icon" onClick={() => setShowDeleteMenu((prev) => !prev)}>
//         <MoreVertical className="h-5 w-5" />
//       </Button>

//       {showDeleteMenu && (
// <div ref={menuRef} className="absolute z-50 mt-2 right-0 w-44 bg-white shadow-lg rounded border text-sm">
//           <button
//             className="w-full px-4 py-2 text-left hover:bg-gray-100"
//             onClick={() => {
//               setSelectMode(true);
//               setShowDeleteMenu(false);
//             }}
//           >
//             Select Messages
//           </button>
//           {isGroupChat && (
//           <button
//   className="w-full px-4 py-2 text-left hover:bg-red-100 text-red-600"
// onClick={() => {
//   toast.custom((t) => (
//     <div className="p-6 rounded-lg shadow-lg bg-white border max-w-md text-center">
//       <h3 className="text-lg font-bold mb-2">Leave Group?</h3>
//       <p className="mb-4 text-gray-700">
//         Are you sure you want to leave <span className="font-semibold">{selectedGroup.name}</span>?
//       </p>
//       <div className="flex justify-center space-x-4">
//         <button
//           onClick={() => toast.dismiss(t)}
//           className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={() => {
//             axios.post(`${ENV.BASE_URL}/api/groups/leave-group`, {
//               groupId: selectedGroup._id,
//               userId: currentUser.id
//             })
//             .then(() => {
//               toast.success("You left the group");
//               // optionally reset selectedGroup here
//             })
//             .catch(err => {
//               toast.error(err.response?.data?.message || "Failed to leave group");
//             });
//             toast.dismiss(t);
//           }}
//           className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//         >
//           Leave
//         </button>
//       </div>
//     </div>
//   ));
// }}




// >
//   Leave Group
// </button>

//           )}
//         </div>
//       )}
//     </div>
//   ) : (
//     // when selecting, show delete buttons outside the 3 dots
//     <div className="flex gap-2">
//       <Button
//         variant="destructive"
//         size="sm"
//         onClick={() => handleDeleteSelected(false)}
//         disabled={selectedMessages.length === 0}
//       >
//         Delete for me ({selectedMessages.length})
//       </Button>
//       <Button
//         variant="destructive"
//         size="sm"
//         onClick={() => handleDeleteSelected(true)}
//         disabled={selectedMessages.length === 0}
//       >
//         Delete for everyone ({selectedMessages.length})
//       </Button>
//       <Button
//         variant="outline"
//         size="sm"
//         onClick={() => {
//           setSelectMode(false);
//           setSelectedMessages([]);
//         }}
//       >
//         Cancel
//       </Button>
//     </div>
//   )}
// </div>

//         </div>
//       </CardHeader>

//   <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
//   {messages.map((msg, i) => {
//     const isMe = msg.senderId === currentUser.id || msg.senderId?._id === currentUser.id;
//     const isSelected = selectedMessages.includes(msg._id);


//     // get sender data safely
// const senderName = isGroupChat
//   ? (typeof msg.senderId === "object" ? msg.senderId.firstName || "?" : "?")
//   : (!isMe ? selectedUser.firstName : "");
//     const senderImage = typeof msg.senderId === "object" ? msg.senderId.profileImage : null;

//     return (
//       <div key={msg._id || i} className={`flex ${isMe ? "justify-end" : "justify-start"} items-start`}>
//         {selectMode && (
//           <input
//             type="checkbox"
//             className="mt-2 mr-2"
//             checked={isSelected}
//             onChange={() => {
//               setSelectedMessages((prev) =>
//                 prev.includes(msg._id)
//                   ? prev.filter((id) => id !== msg._id)
//                   : [...prev, msg._id]
//               );
//             }}
//           />
//         )}

//         {!isMe && (
//           <Avatar className="h-8 w-8 mr-2">
//             <AvatarImage
//               src={senderImage || "/default-user.png"}
//               alt={senderName}
//             />
//             <AvatarFallback>{senderName[0]}</AvatarFallback>
//           </Avatar>
//         )}

//         <div className={`max-w-[70%] p-2 rounded-lg text-sm ${isMe ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}`}>
//           {!isMe && isGroupChat && (
//             <div className="text-xs font-semibold text-muted-foreground mb-1">
//               {senderName}
//             </div>
//           )}

//           {/* Message text */}
//           {msg.message && <div>{msg.message}</div>}

//           {/* Image */}
//           {msg.fileUrl && msg.fileType.startsWith("image/") && (
//             <img
//               src={msg.fileUrl}
//               alt="Sent file"
//               className="mt-2 max-h-60 rounded cursor-pointer"
//               onClick={() => setSelectedMedia({ url: msg.fileUrl, type: 'image' })}
//             />
//           )}

//           {/* Video */}
//           {msg.fileUrl && msg.fileType.startsWith("video/") && (
//             <video
//               className="mt-2 max-h-60 rounded cursor-pointer"
//               onClick={() => setSelectedMedia({ url: msg.fileUrl, type: 'video' })}
//             >
//               <source src={msg.fileUrl} type={msg.fileType} />
//               Your browser does not support video.
//             </video>
//           )}

//           {/* Document */}
//           {msg.fileUrl && !msg.fileType.startsWith("image/") && !msg.fileType.startsWith("video/") && (
//             <a
//               href={msg.fileUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="mt-2 block text-blue-700 underline"
//             >
//               📄 {msg.fileUrl.split("/").pop()}
//             </a>
//           )}

//           <div className="text-xs mt-1 flex justify-between">
//             {formatTime(msg.timestamp)}
//             {isMe && !isGroupChat && (
//               <span className="ml-1">
//                 {msg.read ? <CheckCheck className="w-4 h-4" /> : <Check className="w-4 h-4" />}
//               </span>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   })}
//   <div ref={messagesEndRef} />
// </CardContent>


//       <div className="p-4 border-t">
//         {selectedFile && (
//   <div className="flex items-center mt-2 space-x-4 border p-2 rounded">
//     {selectedFile.type.startsWith("image/") ? (
//       <img
//         src={URL.createObjectURL(selectedFile)}
//         alt="Selected"
//         className="h-16 w-16 object-cover rounded"
//       />
//     ) : selectedFile.type.startsWith("video/") ? (
//       <video className="h-16 w-16 object-cover rounded" controls>
//         <source src={URL.createObjectURL(selectedFile)} type={selectedFile.type} />
//       </video>
//     ) : (
//       <div className="text-sm text-gray-700">
//         📄 {selectedFile.name}
//       </div>
//     )}
//     <Button
//       size="sm"
//       variant="outline"
//       onClick={() => setSelectedFile(null)}
//     >
//       Remove
//     </Button>
//   </div>
// )}

//         {showEmojiPicker && (
// <div ref={emojiRef} className="absolute bottom-6 z-10">
// <Picker
//   data={data}
//   onEmojiSelect={(emoji) => {
//     const emojiChar = emoji.native || emoji?.unified || ""; // fallback
//     setText((prev) => prev + emojiChar);
//   }}
// />
//           </div>
//         )}
        
//         <div className="flex space-x-2 items-end">
//           <Button variant="ghost" onClick={() => setShowEmojiPicker((p) => !p)}>😀</Button>


// <div className="relative inline-block">
//   <Button variant="ghost" onClick={() => setShowAttachmentMenu((p) => !p)}>
//     <Paperclip className="h-5 w-5" />
//   </Button>

//   {showAttachmentMenu && (
//     <div className="absolute z-50 mt-2 w-36 right-0 bg-white shadow-lg rounded border text-sm">
//       <button
//         className="w-full px-4 py-2 text-left hover:bg-gray-100"
//         onClick={() => {
//           document.getElementById("mediaInput").click();
//           setShowAttachmentMenu(false);
//         }}
//       >
//         Choose Media
//       </button>
//       <button
//         className="w-full px-4 py-2 text-left hover:bg-gray-100"
//         onClick={() => {
//           document.getElementById("docInput").click();
//           setShowAttachmentMenu(false);
//         }}
//       >
//         Choose Document
//       </button>
//     </div>
//   )}

//   {/* Hidden file inputs */}
//   <input
//     type="file"
//     accept="image/*,video/*"
//     id="mediaInput"
//     style={{ display: "none" }}
//     onChange={(e) => {
//       if (e.target.files[0]) {
//         setSelectedFile(e.target.files[0]);
//          e.target.value = "";
//       }
//     }}
//   />
//   <input
//     type="file"
//     accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
//     id="docInput"
//     style={{ display: "none" }}
//     onChange={(e) => {
//       if (e.target.files[0]) {
//         setSelectedFile(e.target.files[0]);
//          e.target.value = "";
//       }
//     }}
//   />
// </div>




//           <textarea
//             className="flex-grow h-12 resize-none p-2 rounded border"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 sendMessage();
//               }
//             }}
//           />
//           <Button onClick={sendMessage}>
//             <MessageSquare className="mr-1 h-4 w-4" />
//             Send
//           </Button>
//         </div>
//       </div>
// {selectedMedia && (
//   <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={() => setSelectedMedia(null)}>
//     {selectedMedia.type === 'image' ? (
//       <img src={selectedMedia.url} alt="Preview" className="max-h-[90%] max-w-[90%] rounded" />
//     ) : (
//       <video controls autoPlay className="max-h-[90%] max-w-[90%] rounded">
//         <source src={selectedMedia.url} type="video/mp4" />
//         Your browser does not support video.
//       </video>
//     )}
//   </div>
// )}
// {showGroupDetails && (
//   <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
//     <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
//       <h2 className="text-xl font-bold mb-2">{selectedGroup.name}</h2>
//       <p className="text-sm text-gray-600 mb-4">{selectedGroup.description}</p>
//       <div className="space-y-1 text-sm">
//         <p><strong>Category:</strong> {selectedGroup.category}</p>
//         <p><strong>Progress:</strong> {selectedGroup.progress}%</p>
//         <p><strong>Next Meeting:</strong> {selectedGroup.nextMeeting}</p>
//         <p><strong>Active Discussions:</strong> {selectedGroup.activeDiscussions}</p>
//         <p><strong>Members:</strong> {selectedGroup.members.length}</p>
//         <p><strong>Private:</strong> {selectedGroup.isPrivate ? "Yes" : "No"}</p>
//       </div>

//       <div className="flex justify-end gap-3 mt-6">
//         {selectedGroup.creator._id === currentUser.id ? (
//           <button
//             onClick={() => {
//               // You could open your add member modal here
//               toast.info("Open Add Member modal here.");
//             }}
//             className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//           >
//             Add Member
//           </button>
//         ) : (
//           <button
//             onClick={() => {
//               toast.custom((t) => (
//                 <div className="p-6 rounded-lg shadow-lg bg-white border max-w-md text-center">
//                   <h3 className="text-lg font-bold mb-2">Leave Group?</h3>
//                   <p className="mb-4 text-gray-700">
//                     Are you sure you want to leave <span className="font-semibold">{selectedGroup.name}</span>?
//                   </p>
//                   <div className="flex justify-center space-x-4">
//                     <button
//                       onClick={() => toast.dismiss(t)}
//                       className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={() => {
//                         axios.post(`${ENV.BASE_URL}/api/groups/leave-group`, {
//                           groupId: selectedGroup._id,
//                           userId: currentUser.id
//                         })
//                         .then(() => {
//                           toast.success("You left the group");
//                           setShowGroupDetails(false);
//                           // optionally clear selectedGroup in parent
//                         })
//                         .catch(err => {
//                           toast.error(err.response?.data?.message || "Failed to leave group");
//                         });
//                         toast.dismiss(t);
//                       }}
//                       className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                     >
//                       Leave
//                     </button>
//                   </div>
//                 </div>
//               ));
//             }}
//             className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//           >
//             Leave Group
//           </button>
//         )}
//         <button
//           onClick={() => setShowGroupDetails(false)}
//           className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   </div>
// )}



//     </Card>
//   );
// };

// export default ChatBox;
