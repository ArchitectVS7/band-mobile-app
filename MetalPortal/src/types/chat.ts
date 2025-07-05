// Chat and messaging types

import { User } from './user';
import { ContentAccessLevel } from './post';

export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  FILE = 'FILE',
}

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  senderId: string;
  sender: User;
  receiverId: string;
  receiver: User;
  mediaUrl?: string;
  isRead: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Computed properties
  isOwn?: boolean;
  canDelete?: boolean;
}

export interface CreateMessageInput {
  content: string;
  type: MessageType;
  receiverId: string;
  mediaUrl?: string;
}

export interface UpdateMessageInput {
  content?: string;
  isRead?: boolean;
  isDeleted?: boolean;
}

export interface ChatRoom {
  id: string;
  name: string;
  description?: string;
  isPrivate: boolean;
  accessLevel: ContentAccessLevel;
  maxUsers?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  messages: ChatMessage[];
  // Computed properties
  onlineUsers?: User[];
  userCount?: number;
  canAccess?: boolean;
  canSend?: boolean;
  lastMessage?: ChatMessage;
}

export interface CreateChatRoomInput {
  name: string;
  description?: string;
  isPrivate?: boolean;
  accessLevel: ContentAccessLevel;
  maxUsers?: number;
}

export interface UpdateChatRoomInput {
  name?: string;
  description?: string;
  isPrivate?: boolean;
  accessLevel?: ContentAccessLevel;
  maxUsers?: number;
  isActive?: boolean;
}

export interface ChatMessage {
  id: string;
  content: string;
  type: MessageType;
  roomId: string;
  room: ChatRoom;
  userId: string;
  user: User;
  mediaUrl?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Computed properties
  isOwn?: boolean;
  canDelete?: boolean;
}

export interface CreateChatMessageInput {
  content: string;
  type: MessageType;
  roomId: string;
  mediaUrl?: string;
}

export interface UpdateChatMessageInput {
  content?: string;
  isDeleted?: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participant: User;
  lastMessage?: Message;
  unreadCount: number;
  lastActivity: Date;
  messages: Message[];
  // Computed properties
  canMessage?: boolean;
  isOnline?: boolean;
}

export interface ChatFilter {
  roomId?: string;
  userId?: string;
  type?: MessageType;
  isDeleted?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface ChatSort {
  field: 'createdAt' | 'updatedAt';
  order: 'asc' | 'desc';
}

export interface ChatSearchResult {
  id: string;
  content: string;
  type: MessageType;
  author: {
    id: string;
    username: string;
    displayName?: string;
    avatar?: string;
  };
  roomId?: string;
  roomName?: string;
  createdAt: Date;
  // Highlighted search terms
  highlightedContent?: string;
}

export interface ChatStats {
  totalMessages: number;
  totalRooms: number;
  totalUsers: number;
  onlineUsers: number;
  messagesPerDay: Record<string, number>;
  topRooms: ChatRoom[];
  activeUsers: User[];
}

export interface TypingIndicator {
  userId: string;
  username: string;
  roomId?: string;
  timestamp: Date;
}

export interface OnlinePresence {
  userId: string;
  username: string;
  status: 'online' | 'away' | 'offline';
  lastSeen: Date;
}

export interface ChatNotification {
  id: string;
  type: 'message' | 'mention' | 'room_invite';
  title: string;
  message: string;
  senderId: string;
  senderName: string;
  roomId?: string;
  roomName?: string;
  timestamp: Date;
  isRead: boolean;
}