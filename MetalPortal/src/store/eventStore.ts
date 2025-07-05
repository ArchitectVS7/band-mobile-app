import { create } from 'zustand';
import type { Event, EventRSVP } from '../types/event';

export interface EventStore {
  events: Event[];
  rsvps: EventRSVP[];
  isLoading: boolean;
  error: string | null;
  
  setEvents: (events: Event[]) => void;
  setRsvps: (rsvps: EventRSVP[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useEventStore = create<EventStore>((set) => ({
  events: [],
  rsvps: [],
  isLoading: false,
  error: null,

  setEvents: (events: Event[]) => set({ events }),
  setRsvps: (rsvps: EventRSVP[]) => set({ rsvps }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
}));