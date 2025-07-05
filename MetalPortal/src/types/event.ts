// Event types

import { User } from './user';
import { ContentAccessLevel } from './post';

export enum EventType {
  CONCERT = 'CONCERT',
  MEET_GREET = 'MEET_GREET',
  LISTENING_PARTY = 'LISTENING_PARTY',
  INTERVIEW = 'INTERVIEW',
  LIVESTREAM = 'LIVESTREAM',
}

export enum EventStatus {
  UPCOMING = 'UPCOMING',
  LIVE = 'LIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  type: EventType;
  status: EventStatus;
  startDate: Date;
  endDate?: Date;
  location?: string;
  venue?: string;
  ticketUrl?: string;
  accessLevel: ContentAccessLevel;
  maxAttendees?: number;
  bannerImage?: string;
  mediaUrls: string[];
  viewCount: number;
  attendeeCount: number;
  createdAt: Date;
  updatedAt: Date;
  rsvps: EventRSVP[];
  // Computed properties
  isRsvped?: boolean;
  rsvpStatus?: RSVPStatus;
  canRsvp?: boolean;
  canAccess?: boolean;
  isLive?: boolean;
  isUpcoming?: boolean;
  timeUntilStart?: number;
  duration?: number;
}

export interface CreateEventInput {
  title: string;
  description?: string;
  type: EventType;
  startDate: Date;
  endDate?: Date;
  location?: string;
  venue?: string;
  ticketUrl?: string;
  accessLevel: ContentAccessLevel;
  maxAttendees?: number;
  bannerImage?: string;
  mediaUrls?: string[];
}

export interface UpdateEventInput {
  title?: string;
  description?: string;
  type?: EventType;
  status?: EventStatus;
  startDate?: Date;
  endDate?: Date;
  location?: string;
  venue?: string;
  ticketUrl?: string;
  accessLevel?: ContentAccessLevel;
  maxAttendees?: number;
  bannerImage?: string;
  mediaUrls?: string[];
}

export type RSVPStatus = 'attending' | 'maybe' | 'not_attending';

export interface EventRSVP {
  id: string;
  eventId: string;
  event: Event;
  userId: string;
  user: User;
  status: RSVPStatus;
  createdAt: Date;
  updatedAt: Date;
  // Computed properties
  canChange?: boolean;
}

export interface CreateEventRSVPInput {
  eventId: string;
  status: RSVPStatus;
}

export interface UpdateEventRSVPInput {
  status: RSVPStatus;
}

export interface EventFilter {
  type?: EventType;
  status?: EventStatus;
  accessLevel?: ContentAccessLevel;
  location?: string;
  venue?: string;
  dateFrom?: Date;
  dateTo?: Date;
  hasTickets?: boolean;
  maxAttendees?: number;
  rsvpStatus?: RSVPStatus;
}

export interface EventSort {
  field: 'startDate' | 'endDate' | 'createdAt' | 'attendeeCount' | 'viewCount';
  order: 'asc' | 'desc';
}

export interface EventSearchResult {
  id: string;
  title: string;
  description?: string;
  type: EventType;
  status: EventStatus;
  startDate: Date;
  endDate?: Date;
  location?: string;
  venue?: string;
  bannerImage?: string;
  attendeeCount: number;
  accessLevel: ContentAccessLevel;
  isRsvped?: boolean;
  rsvpStatus?: RSVPStatus;
}

export interface EventStats {
  totalEvents: number;
  upcomingEvents: number;
  liveEvents: number;
  completedEvents: number;
  totalAttendees: number;
  averageAttendees: number;
  byType: Record<EventType, number>;
  byStatus: Record<EventStatus, number>;
  topEvents: EventSearchResult[];
  recentEvents: EventSearchResult[];
}

export interface EventCalendar {
  date: Date;
  events: EventSearchResult[];
  dayOfWeek: string;
  isToday: boolean;
  isCurrentMonth: boolean;
  hasEvents: boolean;
}

export interface EventReminder {
  id: string;
  eventId: string;
  userId: string;
  reminderTime: Date;
  type: 'push' | 'email' | 'both';
  isActive: boolean;
  createdAt: Date;
}

export interface CreateEventReminderInput {
  eventId: string;
  reminderTime: Date;
  type: 'push' | 'email' | 'both';
}

export interface EventNotification {
  id: string;
  type: 'reminder' | 'status_change' | 'new_event' | 'cancellation';
  eventId: string;
  eventTitle: string;
  message: string;
  scheduledAt: Date;
  isRead: boolean;
  createdAt: Date;
}