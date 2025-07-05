import { create } from 'zustand';
import type { ForumPost, ForumCategory } from '../types/forum';

export interface ForumStore {
  posts: ForumPost[];
  categories: ForumCategory[];
  isLoading: boolean;
  error: string | null;
  
  setPosts: (posts: ForumPost[]) => void;
  setCategories: (categories: ForumCategory[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useForumStore = create<ForumStore>((set) => ({
  posts: [],
  categories: [],
  isLoading: false,
  error: null,

  setPosts: (posts: ForumPost[]) => set({ posts }),
  setCategories: (categories: ForumCategory[]) => set({ categories }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
}));