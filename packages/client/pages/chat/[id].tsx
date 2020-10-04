import React, { useState, ReactElement, ChangeEvent } from 'react';
import { useRouter } from 'next/router';

import styles from './chat.module.css';
import useChat from '../../components/useChat';

const ChatRoom = (): ReactElement => {
  const router = useRouter();
  const { id: roomId } = router.query;
  const { messages, sendMessage } = useChat(roomId as string);
  const [newMessage, setNewMessage] = useState('');

  const handleNewMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div className={styles['chat-room-container']}>
      <h1 className={styles['room-name']}>Room: {roomId}</h1>
      <div className={styles['messages-container']}>
        <ol className={styles['messages-list']}>
          {messages.map((message, i) => (
            <li
              key={i}
              className={`${styles['message-item']} ${
                message.ownedByCurrentUser
                  ? styles['my-message']
                  : styles['received-message']
              }`}
            >
              {message.body}
            </li>
          ))}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className={styles['new-message-input-field']}
      />
      <button
        onClick={handleSendMessage}
        className={styles['send-message-button']}
      >
        Send
      </button>
    </div>
  );
};

export default ChatRoom;
