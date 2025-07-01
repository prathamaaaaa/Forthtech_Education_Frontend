import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { UserPlus, XCircle, Users, Lock } from "lucide-react";

export const ENV = {
  BASE_URL: import.meta.env.VITE_URL || "http://localhost:5000",
};

const GroupDetailsModal = ({ selectedGroup, currentUser, setShowGroupDetails }) => {
  const [showAddMembers, setShowAddMembers] = useState(false);
  const [followList, setFollowList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const loadFollowList = async () => {
    try {
      const res = await axios.get(`${ENV.BASE_URL}/api/users`);
      const allUsers = res.data;

      const currentUserData = allUsers.find(
        u => u.id === currentUser.id || u._id === currentUser.id
      );

      if (!currentUserData?.followList) {
        toast.error("Your user data not found or followList invalid");
        return;
      }

      const groupMemberIds = selectedGroup.members.map(m => (m._id || m.id).toString());
      const follows = allUsers.filter(u => {
        const userId = (u._id || u.id).toString();
        return currentUserData.followList.includes(userId) && !groupMemberIds.includes(userId);
      });

      setFollowList(follows);
      setShowAddMembers(true);
    } catch (err) {
      console.error("Failed to load users:", err);
      toast.error("Failed to load users");
    }
  };

  const addMembersToGroup = async () => {
    try {
      await axios.post(`${ENV.BASE_URL}/api/groups/${selectedGroup._id}/add-members`, {
        userIds: selectedUsers
      });
      toast.success("Members added to the group");
      setShowAddMembers(false);
      setSelectedUsers([]);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add members");
    }
  };

const handleLeaveGroup = () => {
  toast(
    "Are you sure you want to leave this group?",
    {
      description: `Group: ${selectedGroup.name}`,
      action: {
        label: "Leave",
        onClick: async () => {
          try {
            await axios.post(`${ENV.BASE_URL}/api/groups/leave-group`, {
              groupId: selectedGroup._id,
              userId: currentUser.id
            });
            toast.success("You left the group.");
            setShowGroupDetails(false);
          } catch (err) {
            console.error("Failed to leave group:", err);
            toast.error(err.response?.data?.message || "Failed to leave group");
          }
        }
      },
      cancel: {
        label: "Cancel",
        onClick: () => {
          toast.info("Cancelled leaving the group.");
        }
      }
    }
  );
};


  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <h2 className="text-2xl font-bold">{selectedGroup.name}</h2>
          <p className="text-sm opacity-80">{selectedGroup.description}</p>
        </div>

        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-gray-500">Category</span>
            <span className="font-semibold">{selectedGroup.category}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-gray-500">Progress</span>
            <span className="font-semibold">{selectedGroup.progress}%</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-gray-500">Next Meeting</span>
            <span className="font-semibold">{selectedGroup.nextMeeting}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-gray-500">Discussions</span>
            <span className="font-semibold">{selectedGroup.activeDiscussions}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="ml-2 font-semibold">{selectedGroup.members.length} Members</span>
          </div>
          <div className="flex items-center">
            <Lock className="w-4 h-4 text-gray-400" />
            <span className="ml-2 font-semibold">{selectedGroup.isPrivate ? "Private" : "Public"}</span>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t">
          {selectedGroup.creator._id === currentUser.id ? (
            <button
              onClick={loadFollowList}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
            >
              <UserPlus size={16} /> Add Member
            </button>
          ) : (
            <button
              onClick={handleLeaveGroup}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
            >
              <XCircle size={16} /> Leave Group
            </button>
          )}
          <button
            onClick={() => setShowGroupDetails(false)}
            className="px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition"
          >
            Close
          </button>
        </div>
      </div>

      {showAddMembers && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Add Members</h3>
            <div className="max-h-60 overflow-y-auto space-y-3">
              {followList.length === 0 ? (
                <p className="text-sm text-gray-500">You don't follow anyone yet.</p>
              ) : (
                followList.map(user => (
                  <label key={user._id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() =>
                        setSelectedUsers(prev =>
                          prev.includes(user.id)
                            ? prev.filter(id => id !== user.id)
                            : [...prev, user.id]
                        )
                      }
                    />
                    <span>{user.firstName} {user.lastName}</span>
                  </label>
                ))
              )}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={addMembersToGroup}
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddMembers(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupDetailsModal;
