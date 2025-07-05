import { create } from 'zustand';
import type { ChatMessage, ChatRoom } from '../types/chat';

export interface ChatStore {
  messages: ChatMessage[];
  rooms: ChatRoom[];
  isLoading: boolean;
  error: string | null;
  
  setMessages: (messages: ChatMessage[]) => void;
  setRooms: (rooms: ChatRoom[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  rooms: [],
  isLoading: false,
  error: null,

  setMessages: (messages: ChatMessage[]) => set({ messages }),
  setRooms: (rooms: ChatRoom[]) => set({ rooms }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
}));