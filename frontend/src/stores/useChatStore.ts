import { create } from "zustand";
import { Message, User } from "@/types";
import { axios } from "@/lib/axios";
import { io } from "socket.io-client";

type ChatStore = {
  users: User[];
  messages: Message[];
  error: string | null;
  isLoading: boolean;
  selectedUser: User | null;
  socket: any;
  isConnectd: boolean;
  onlineUsers: Set<string>;
  userActivities: Map<string, string>;

  fetchUsers: () => Promise<void>;
  fetchMessages: (userId: string) => Promise<void>;
  setSelectedUser: (user: User | null) => void;
  initSocket: (userId: string) => void;
  disconnectSocket: () => void;
  sendMessage: (receiverId: string, senderId: string, content: string) => void;
};

const baseUrl =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

const socket = io(baseUrl, {
  autoConnect: false,
  withCredentials: true,
});

export const useChatStore = create<ChatStore>((set, get) => ({
  users: [],
  messages: [],
  isLoading: false,
  error: null,
  selectedUser: null,
  socket: socket,
  isConnectd: false,
  onlineUsers: new Set(),
  userActivities: new Map(),

  setSelectedUser: (user) => set({ selectedUser: user }),

  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get("/users");
      set({ users: res.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMessages: async (userId) => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  initSocket: (userId) => {
    if (!get().isConnectd) {
      socket.auth = { userId };
      socket.connect();

      socket.emit("user_connected", userId);

      socket.on("users_online", (users: string[]) => {
        set({ onlineUsers: new Set(users) });
      });

      socket.on("activities", (activities: [string, string][]) => {
        set({ userActivities: new Map(activities) });
      });

      socket.on("user_connected", (userId: string) => {
        set((state) => ({
          onlineUsers: new Set([...state.onlineUsers, userId]),
        }));
      });

      socket.on("user_disconnected", (userId: string) => {
        set((state) => {
          const newOnlineUsers = new Set(state.onlineUsers);
          newOnlineUsers.delete(userId);
          return { onlineUsers: newOnlineUsers };
        });
      });

      socket.on("receive_message", (message: Message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });

      socket.on("message_sent", (message: Message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });

      socket.on("activity_updated", ({ userId, activity }) => {
        set((state) => {
          const newActivities = new Map(state.userActivities);
          newActivities.set(userId, activity);
          return { userActivities: newActivities };
        });
      });

      set({ isConnectd: true });
    }
  },

  disconnectSocket: () => {
    if (get().isConnectd) {
      socket.disconnect();
      set({ isConnectd: false });
    }
  },

  sendMessage: async (receiverId, senderId, content) => {
    const socket = get().socket;
    if (!socket) return;

    socket.emit("send_message", { receiverId, senderId, content });
  },
}));
