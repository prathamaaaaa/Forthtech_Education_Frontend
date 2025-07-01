import React, { useEffect, useState } from "react";
import { Bell, Trash2 } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

export interface NotificationItem {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  server?: string;
  visibleTo: string[];
  isReadBy: string[];
}

const NotificationBell: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [highlightedUnread, setHighlightedUnread] = useState<string[]>([]);
  const userId = JSON.parse(localStorage.getItem("user") || "{}")?.user?.id;
  const BASE_URL = import.meta.env.VITE_URL || "http://localhost:5000";

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/notifications/${userId}`);
      const newUnreadIds = res.data
        .filter(
          (n: NotificationItem) =>
            !n.isReadBy.includes(userId) &&
            !notifications.some((prev) => prev._id === n._id)
        )
        .map((n) => n._id);

      if (newUnreadIds.length > 0) {
        setHighlightedUnread((prev) => [...prev, ...newUnreadIds]);

        // Remove highlight after 5 seconds
        setTimeout(() => {
          setHighlightedUnread((prev) =>
            prev.filter((id) => !newUnreadIds.includes(id))
          );
        }, 5000);
      }

      setNotifications(res.data);
    } catch (err) {
      toast.error("Failed to fetch notifications");
    }
  };

  useEffect(() => {
    if (!userId) return;
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, [userId]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}/api/notifications/${id}/${userId}`);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      toast.success("Notification deleted");
    } catch {
      toast.error("Failed to delete notification");
    }
  };

  const clearAllNotifications = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/notifications/user/${userId}`);
      setNotifications([]);
      toast.success("All notifications cleared");
    } catch {
      toast.error("Failed to clear notifications");
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.patch(`${BASE_URL}/api/notifications/mark-read/${userId}`);
      setNotifications((prev) =>
        prev.map((n) =>
          n.isReadBy.includes(userId) ? n : { ...n, isReadBy: [...n.isReadBy, userId] }
        )
      );
    } catch {
      console.error("Failed to mark notifications as read");
    }
  };

  const unreadCount = notifications.filter((n) => !n.isReadBy.includes(userId)).length;

  const grouped = notifications.reduce((acc, curr) => {
    const date = curr.date;
    acc[date] = [...(acc[date] || []), curr];
    return acc;
  }, {} as Record<string, NotificationItem[]>);

  return (
    <Popover
      onOpenChange={async (open) => {
        if (open) await markAllAsRead();
      }}
    >
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-96 p-4 shadow-lg rounded-lg" align="end">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Notifications</h3>
          {notifications.length > 0 && (
            <button
              onClick={clearAllNotifications}
              className="text-sm text-forthtech-red hover:underline"
            >
              Clear Notifications
            </button>
          )}
        </div>

        <ScrollArea className="h-64 pr-2">
          {Object.entries(grouped).length === 0 ? (
            <p className="text-sm text-gray-500">No notifications</p>
          ) : (
            Object.entries(grouped).map(([date, notifs]) => (
              <div key={date} className="mb-4">
                <p className="text-xs text-muted-foreground font-semibold mb-2">
                  {new Date(date).toDateString()}
                </p>
                {notifs.map((notif) => {
                  const isUnread = !notif.isReadBy.includes(userId);
                  const isHighlighted = highlightedUnread.includes(notif._id);

                  const bgColor = isUnread
                    ? isHighlighted
                      ? "bg-orange-200"
                      : "bg-orange-100"
                    : "bg-gray-100";

                  return (
                    <div
                      key={notif._id}
                      className={`relative p-3 rounded-md mb-2 border transition-colors duration-300 ${bgColor}`}
                    >
                      {isUnread && (
                        <span className="absolute top-2 left-2 text-xs bg-red-500 text-white px-1 rounded">
                          New
                        </span>
                      )}
                      <button
                        onClick={() => handleDelete(notif._id)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <p className="font-medium">{notif.title}</p>
                      <p className="text-sm text-gray-700">{notif.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notif.server && <>Server: {notif.server} · </>}
                        {notif.time}
                      </p>
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
