export type User = {
  id: number;
  name: string;
};

export type Message = {
  ownedByCurrentUser: boolean;
  body: string;
  senderId: string;
};

export interface Chat {
  messages: Message[];
  sendMessage: (m: string) => void;
}
