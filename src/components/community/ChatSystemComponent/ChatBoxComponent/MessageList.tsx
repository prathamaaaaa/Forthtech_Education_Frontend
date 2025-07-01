import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, CheckCheck } from "lucide-react";

const MessageList = ({
  messages,
  currentUser,
  selectedUser,
  selectedGroup,
  isGroupChat,
  selectMode,
  selectedMessages,
  setSelectedMessages,
  setSelectedMedia
}) => {
  const formatTime = (time) =>
    new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {messages.map((msg, i) => {
        const isMe = msg.senderId === currentUser.id || msg.senderId?._id === currentUser.id;
        const isSelected = selectedMessages.includes(msg._id);
        const senderName = isGroupChat
          ? (typeof msg.senderId === "object" ? msg.senderId.firstName || "?" : "?")
          : (!isMe ? selectedUser.firstName : "");
        const senderImage = typeof msg.senderId === "object" ? msg.senderId.profileImage : null;

        return (
          <div key={msg._id || i} className={`flex ${isMe ? "justify-end" : "justify-start"} items-start`}>
            {selectMode && (
              <input
                type="checkbox"
                className="mt-2 mr-2"
                checked={isSelected}
                onChange={() =>
                  setSelectedMessages((prev) =>
                    prev.includes(msg._id)
                      ? prev.filter((id) => id !== msg._id)
                      : [...prev, msg._id]
                  )
                }
              />
            )}

            {!isMe && (
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={senderImage || "/default-user.png"} alt={senderName} />
                <AvatarFallback>{senderName[0]}</AvatarFallback>
              </Avatar>
            )}

            <div className={`max-w-[70%] p-2 rounded-lg text-sm ${isMe ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}`}>
              {!isMe && isGroupChat && (
                <div className="text-xs font-semibold text-muted-foreground mb-1">
                  {senderName}
                </div>
              )}

              {msg.message && <div>{msg.message}</div>}

              {msg.fileUrl && msg.fileType.startsWith("image/") && (
                <img
                  src={msg.fileUrl}
                  alt="Sent file"
                  className="mt-2 max-h-60 rounded cursor-pointer"
                  onClick={() => setSelectedMedia({ url: msg.fileUrl, type: 'image' })}
                />
              )}

              {msg.fileUrl && msg.fileType.startsWith("video/") && (
                <video
                  className="mt-2 max-h-60 rounded cursor-pointer"
                  onClick={() => setSelectedMedia({ url: msg.fileUrl, type: 'video' })}
                >
                  <source src={msg.fileUrl} type={msg.fileType} />
                  Your browser does not support video.
                </video>
              )}

              {msg.fileUrl && !msg.fileType.startsWith("image/") && !msg.fileType.startsWith("video/") && (
                <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block text-blue-700 underline">
                  📄 {msg.fileUrl.split("/").pop()}
                </a>
              )}

              <div className="text-xs mt-1 flex justify-between">
                {formatTime(msg.timestamp)}
                {isMe && !isGroupChat && (
                  <span className="ml-1">
                    {msg.read ? <CheckCheck className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MessageList;
