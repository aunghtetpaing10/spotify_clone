import { create } from "zustand";
import { Album, Song } from "@/types";
import { axios } from "@/lib/axios";

type MusicStore = {
  songs: Song[];
  albums: Album[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  featuredSongs: Song[];
  madeForYouSongs: Song[];
  trendingSongs: Song[];

  fetchAlbums: () => Promise<void>;
  fetchAlbumbyId: (id: string) => Promise<void>;
  fetchSongs: () => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
};

export const useMusicStore = create<MusicStore>((set) => ({
  songs: [],
  albums: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  featuredSongs: [],
  madeForYouSongs: [],
  trendingSongs: [],

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

  fetchFeaturedSongs: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.get("/songs/featured");
      set({ featuredSongs: res.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMadeForYouSongs: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.get("/songs/made-for-you");
      set({ madeForYouSongs: res.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTrendingSongs: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.get("/songs/trending");
      set({ trendingSongs: res.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
