import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Paperclip } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const MessageInput = ({
  text,
  setText,
  showEmojiPicker,
  setShowEmojiPicker,
  showAttachmentMenu,
  setShowAttachmentMenu,
  selectedFile,
  setSelectedFile,
  sendMessage,
  emojiRef
}) => {
  const attachmentMenuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If click is NOT inside emoji picker
      if (
        emojiRef?.current &&
        !event.target.closest(".emoji-picker-container")
      ) {
        setShowEmojiPicker(false);
      }

      // If click is NOT inside attachment menu
      if (
        attachmentMenuRef?.current &&
        !event.target.closest(".attachment-menu-container")
      ) {
        setShowAttachmentMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [emojiRef, setShowEmojiPicker, setShowAttachmentMenu]);

  return (
    <div className="p-4 border-t relative">
      {selectedFile && (
        <div className="flex items-center mt-2 space-x-4 border p-2 rounded">
          {selectedFile.type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Selected"
              className="h-16 w-16 object-cover rounded"
            />
          ) : selectedFile.type.startsWith("video/") ? (
            <video className="h-16 w-16 object-cover rounded" controls>
              <source
                src={URL.createObjectURL(selectedFile)}
                type={selectedFile.type}
              />
            </video>
          ) : (
            <div className="text-sm text-gray-700">
              📄 {selectedFile.name}
            </div>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setSelectedFile(null)}
          >
            Remove
          </Button>
        </div>
      )}

      {showEmojiPicker && (
        <div
          ref={emojiRef}
          className="emoji-picker-container absolute bottom-16 left-4 z-50"
        >
          <Picker
            data={data}
            onEmojiSelect={(emoji) =>
              setText((prev) => prev + (emoji.native || ""))
            }
          />
        </div>
      )}

      <div className="flex space-x-2 items-end">
        <Button
          variant="ghost"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
        >
          😀
        </Button>

        <div
          ref={attachmentMenuRef}
          className="attachment-menu-container relative inline-block"
        >
          <Button
            variant="ghost"
            onClick={() => setShowAttachmentMenu((prev) => !prev)}
          >
            <Paperclip className="h-5 w-5" />
          </Button>

          {showAttachmentMenu && (
            <div className="absolute z-50 mt-2 w-36 right-0 bg-white shadow-lg rounded border text-sm">
              <button
                className="w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => {
                  document.getElementById("mediaInput").click();
                  setShowAttachmentMenu(false);
                }}
              >
                Choose Media
              </button>
              <button
                className="w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => {
                  document.getElementById("docInput").click();
                  setShowAttachmentMenu(false);
                }}
              >
                Choose Document
              </button>
            </div>
          )}

          <input
            type="file"
            accept="image/*,video/*"
            id="mediaInput"
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files[0]) {
                setSelectedFile(e.target.files[0]);
                e.target.value = "";
              }
            }}
          />
          <input
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
            id="docInput"
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files[0]) {
                setSelectedFile(e.target.files[0]);
                e.target.value = "";
              }
            }}
          />
        </div>

        <textarea
          className="flex-grow h-12 resize-none p-2 rounded border"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />

        <Button onClick={sendMessage}>
          <MessageSquare className="mr-1 h-4 w-4" /> Send
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
