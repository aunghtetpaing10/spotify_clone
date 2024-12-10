import { create } from "zustand";
import { Album, Song, Stats } from "@/types";
import { axios } from "@/lib/axios";
import { toast } from "react-hot-toast";

type MusicStore = {
  songs: Song[];
  albums: Album[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  featuredSongs: Song[];
  madeForYouSongs: Song[];
  trendingSongs: Song[];
  stats: Stats;

  fetchAlbums: () => Promise<void>;
  fetchAlbumbyId: (id: string) => Promise<void>;
  fetchSongs: () => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  fetchStats: () => Promise<void>;
  deleteSong: (id: string) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
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
  stats: {
    totalSongs: 0,
    totalAlbums: 0,
    totalArtists: 0,
    totalUsers: 0,
  },

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

  fetchStats: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.get("/stats");
      set({ stats: res.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteSong: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      await axios.delete(`/admin/songs/${id}`);
      set((state) => ({
        songs: state.songs.filter((song) => song._id !== id),
      }));
      toast.success("Song deleted successfully");
    } catch (error: any) {
      set({ error: error.message });
      toast.error("Failed to delete song");
    } finally {
      set({ isLoading: false });
    }
  },

  deleteAlbum: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      await axios.delete(`/admin/albums/${id}`);
      set((state) => ({
        albums: state.albums.filter((album) => album._id !== id),
      }));
      toast.success("Album deleted successfully");
    } catch (error: any) {
      set({ error: error.message });
      toast.error("Failed to delete album");
    } finally {
      set({ isLoading: false });
    }
  },
}));
