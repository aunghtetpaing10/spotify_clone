import { create } from "zustand";
import { Album, Song } from "@/types";
import { axios } from "@/lib/axios";

type MusicStore = {
  songs: Song[];
  albums: Album[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;

  fetchAlbums: () => Promise<void>;
  fetchAlbumbyId: (id: string) => Promise<void>;
  fetchSongs: () => Promise<void>;
};

export const useMusicStore = create<MusicStore>((set) => ({
  songs: [],
  albums: [],
  isLoading: false,
  error: null,
  currentAlbum: null,

  fetchSongs: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.get("/songs");
      set({ songs: res.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAlbums: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.get("/albums");
      set({ albums: res.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAlbumbyId: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.get(`/albums/${id}`);
      set({ currentAlbum: res.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
