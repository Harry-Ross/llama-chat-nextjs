export interface Message {
  message_id?: number;
  conversation_id?: number;
  content: string;
  system: boolean;
  timestamp?: number;
}

export interface Conversation {
  conversation_id: number;
  title: string;
  timestamp: number;
  messages: Message[];
};