import { create } from 'zustand';
import type { Post } from '../types/post';

export interface PostStore {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  deletePost: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  isLoading: false,
  error: null,

  setPosts: (posts: Post[]) => set({ posts }),
  addPost: (post: Post) => set((state) => ({ posts: [...state.posts, post] })),
  updatePost: (id: string, updates: Partial<Post>) => 
    set((state) => ({
      posts: state.posts.map(post => 
        post.id === id ? { ...post, ...updates } : post
      )
    })),
  deletePost: (id: string) => 
    set((state) => ({
      posts: state.posts.filter(post => post.id !== id)
    })),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
}));