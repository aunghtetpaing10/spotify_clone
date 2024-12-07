import { create } from "zustand";
import { Message, User } from "@/types";
import { axios } from "@/lib/axios";

type ChatStore = {
    users: User[];
    messages: Message[];
    error: string | null;
    isLoading: boolean;
    selectedUser: User | null;

    fetchUsers: () => Promise<void>;
    fetchMessages: (userId: string) => Promise<void>;
    setSelectedUser: (user: User | null) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
    users: [],
    messages: [],
    isLoading: false,
    error: null,
    selectedUser: null,

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
}));