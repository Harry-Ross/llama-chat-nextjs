export interface Message {
  message_id?: number;
  conversation_id?: number;
  content: string;
  system: boolean;
  timestamp?: number;
}

export interface BasicConversation {
  conversation_id: number;
  title: string;
  timestamp: number;
}

export interface Conversation extends BasicConversation {
  messages: Message[];
};