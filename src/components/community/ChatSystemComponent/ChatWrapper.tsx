import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

export const ENV = {
  BASE_URL: import.meta.env.VITE_URL || "http://localhost:5000",
};

const InviteUsersPopup = ({
  currentUser,
  onClose,
  socket,
    requests,
}: {
  currentUser: any;
  onClose: () => void;
    requests: any[];

  socket: Socket | null;
}) => {
  const [users, setUsers] = useState<any[]>([]);
  const [invitedUserIds, setInvitedUserIds] = useState<string[]>([]);
const [invitingIds, setInvitingIds] = useState<string[]>([]);

  // ✅ Initialize socket only once
  // useEffect(() => {
  //   if (!currentUser?.id) return;

  //   // const socket = io(ENV.BASE_URL, {
  //   //   auth: {
  //   //     userId: currentUser.id,
  //   //   },
  //   // });


  //   // socket.on("connect", () => {
  //   //   console.log("✅ Socket connected in InviteUsersPopup", socket.id);
  //   // });

  //   // socket.on("disconnect", () => {
  //   //   console.log("❌ Socket disconnected in InviteUsersPopup");
  //   // });

  //   // return () => {
  //   //   socket.disconnect();
  //   // };
  // }, [currentUser?.id]);

  // ✅ Load user data
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUserRes = await axios.get(
          `${ENV.BASE_URL}/api/users/${currentUser.id}`
        );
        const currentData = currentUserRes.data;

        const requestList = currentData.requestList || [];
        console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",requestList)

        const alreadyInvitedIds = requestList
          .filter((r: any) => r.status === "sent")
          .map((r: any) => r.user._id || r.user.id || r.user);

        const alreadyFollowingIds = (currentData.followList || []).map(
          (id: any) => (typeof id === "string" ? id : id._id || id)
        );

        setInvitedUserIds(alreadyInvitedIds);

        const allUsersRes = await axios.get(`${ENV.BASE_URL}/api/users`);
        
        const filtered = allUsersRes.data.filter(
          (u: any) =>
            u.email !== currentUser.email &&
            !alreadyFollowingIds.includes(u._id || u.id) &&
            !alreadyInvitedIds.includes(u._id || u.id)
        );
        

        const normalized = filtered.map((u: any) => ({
          ...u,
          id: u._id || u.id,
        }));

        setUsers(normalized);
      } catch (err) {
        console.error("Error loading invite popup data:", err);
      }
    };

    if (currentUser?.id) fetchData();
  }, [currentUser?.id]);

  // const handleInvite = async (userId: string) => {
  //   try {
  //     await axios.patch(`${ENV.BASE_URL}/api/users/${currentUser.id}/request`, {
  //       invitedUserId: userId,
  //     });

  //     // Emit socket only once safely
  //     socket?.emit("send-invite", {
  //       fromId: currentUser.id,
  //       toId: userId,
  //     });

  //     // Update UI
  //     setUsers((prev) => prev.filter((u) => u.id !== userId));
  //     setInvitedUserIds((prev) => [...prev, userId]);
  //   } catch (err) {
  //     console.error("Failed to invite user:", err);
  //   }
  // };



const handleInvite = async (userId: string) => {
  if (!userId || userId === currentUser.id) {
    console.error("❌ Invalid userId to invite:", userId);
    return;
  }
   if (invitingIds.includes(userId)) return; // prevent double click

  setInvitingIds((prev) => [...prev, userId]);
    await new Promise((resolve) => setTimeout(resolve, 0));
  try {
    console.log("Inviting user:", userId, "from:", currentUser.id);
    await axios.patch(`${ENV.BASE_URL}/api/users/${currentUser.id}/request`, {
      invitedUserId: userId,
    });

    socket?.emit("send-invite", {
      fromId: currentUser.id,
      toId: userId,
    });

    setUsers((prev) => prev.filter((u) => u.id !== userId));
    setInvitedUserIds((prev) => [...prev, userId]);
    toast.success("Invitation sent!");
  } catch (err: any) {
    console.error("Failed to invite user:", err);
    console.log("Server responded with:", err.response?.data);

    // ✅ check if server says already invited or followed
    if (err.response?.data?.error === "Already invited or followed") {
      toast.info("You already invited or followed this user.");
    } else {
      toast.error("Failed to invite user. Try again.");
    }
  } finally {
    setInvitingIds((prev) => prev.filter((id) => id !== userId));
  }
};

return (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-[400px] max-h-[80vh] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Invite Users</h2>


      {users.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No users available to invite.
        </p>
      ) : (
        users.map((u) => (
          <div
            key={u.id}
            className="flex justify-between items-center mb-2"
          >
            <span>
              {u.firstName} {u.lastName}
            </span>
           <Button
  variant="default"
  onClick={() => handleInvite(u.id)}
  size="sm"
  disabled={invitingIds.includes(u.id)}
>
  {invitingIds.includes(u.id) ? "Sending..." : "Invite"}
</Button>

          </div>
        ))
      )}
      <div className="mt-4 text-right">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  </div>
);

};

export default InviteUsersPopup;
