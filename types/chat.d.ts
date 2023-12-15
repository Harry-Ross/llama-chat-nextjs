export interface Message {
  text: string;
  system: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
};