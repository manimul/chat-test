import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

import { Message, Chat } from '../interfaces';

enum EVENTS {
  NEW_CHAT_MESSAGE = 'NEW_CHAT_MESSAGE',
}
const SOCKET_SERVER_URL = 'http://localhost:4000';

const useChat = (roomId: string): Chat => {
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef?.current?.on(EVENTS.NEW_CHAT_MESSAGE, (message: Message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef?.current?.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    return () => {
      socketRef?.current?.disconnect();
    };
  }, [roomId]);

  const sendMessage = (messageBody: string) => {
    socketRef?.current?.emit(EVENTS.NEW_CHAT_MESSAGE, {
      body: messageBody,
      senderId: socketRef.current.id,
    });
  };

  return { messages, sendMessage };
};

export default useChat;
