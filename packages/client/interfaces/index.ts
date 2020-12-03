export type User = {
  id: number;
  name: string;
};

export type Message = {
  ownedByCurrentUser: boolean;
  body: string;
  image: string;
  senderId: string;
  indexNum: number;
  currentState: Message[];
};

export interface Chat {
  messages: Message[];
  sendMessage: (m: Message) => void;
  editMessage: (m: Message, n: number) => void;
  deleteMessage: (n: number) => void;
}
