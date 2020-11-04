import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { Message, Chat } from '../interfaces';

enum EVENTS {
  NEW_CHAT_MESSAGE = 'NEW_CHAT_MESSAGE',
  DELETE_CHAT_MESSAGE = 'DELETE_CHAT_MESSAGE',
  EDIT_CHAT_MESSAGE = 'EDIT_CHAT_MESSAGE',
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

    socketRef?.current?.on(EVENTS.EDIT_CHAT_MESSAGE, (messageData: Message) => {
      const tempIndex = messageData.indexNum;
      const tempMessages = messageData.currentState;

      tempMessages[tempIndex].body = messageData.body;
      tempMessages[tempIndex].image = messageData.image;

      tempMessages.map((item) => {
        item.ownedByCurrentUser = item.senderId === socketRef?.current?.id;
      });
      setMessages(tempMessages);
    });

    socketRef?.current?.on(
      EVENTS.DELETE_CHAT_MESSAGE,
      (messageData: Message) => {
        const tempIndex = messageData.indexNum;
        const tempMessages = messageData.currentState;
        tempMessages.splice(tempIndex, 1);
        tempMessages.map((item) => {
          item.ownedByCurrentUser = item.senderId === socketRef?.current?.id;
        });
        setMessages(tempMessages);
      }
    );

    return () => {
      socketRef?.current?.disconnect();
    };
  }, [roomId]);

  const deleteMessage = (messageIndex: number) => {
    const currentState: Message[] = messages;
    socketRef?.current?.emit(EVENTS.DELETE_CHAT_MESSAGE, {
      indexNum: messageIndex,
      currentState: currentState,
    });
  };

  const editMessage = (messageBody: Message, messageIndex: number) => {
    const currentState: Message[] = messages;

    socketRef?.current?.emit(EVENTS.EDIT_CHAT_MESSAGE, {
      body: messageBody.body,
      image: messageBody.image,
      senderId: socketRef.current?.id,
      indexNum: messageIndex,
      currentState: currentState,
    });
  };

  const sendMessage = (messageBody: Message) => {
    socketRef?.current?.emit(EVENTS.NEW_CHAT_MESSAGE, {
      body: messageBody.body,
      image: messageBody.image,
      senderId: socketRef.current?.id,
    });
  };
  return { messages, sendMessage, deleteMessage, editMessage };
};

export default useChat;
