export type User = {
  id: number;
  name: string;
};

export type Message = {
  ownedByCurrentUser: boolean;
  body: string;
  image: string;
  senderId: string;
};

export interface Chat {
  messages: Message[];
  sendMessage: (m: object) => void;
}
