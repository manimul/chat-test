import React, { useState, ReactElement, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import styles from './chat.module.css';
import useChat from '../../components/useChat';
import { Message } from '../../interfaces';

const ChatRoom = (): ReactElement => {
  const router = useRouter();
  const { id: roomId } = router.query;
  const { messages, sendMessage } = useChat(roomId as string);
  const [newMessage, setNewMessage] = useState('');
  const newMessageObj = {} as Message;
  const [newImage, setNewImage] = useState('');
  const imageInputRef = React.useRef<HTMLInputElement>(null);

  const handleNewMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(event.target.value);
  };

  const handleNewImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null) {
      setNewImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSendMessage = () => {
    newMessageObj.body = newMessage;
    newMessageObj.image = newImage;
    if (newMessageObj.body != '' || newMessageObj.image != '') {
      sendMessage(newMessageObj);
    }
    clearMessages();
  };

  const clearMessages = () => {
    setNewMessage(((newMessageObj.body = ''), (newMessageObj.image = '')));
    removeImage();
  };

  const removeImage = () => {
    setNewImage('');
    if (imageInputRef.current != null && imageInputRef.current.value != '') {
      imageInputRef.current.value = '';
    }
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
              {message.image && (
                <img className={styles['message-image']} src={message.image} />
              )}

              {message.body}
            </li>
          ))}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder='Write message...'
        className={styles['new-message-input-field']}
      />
      {newImage && (
        <div className={styles['new-message-image-preview']}>
          <div>
            <span>Image Preview</span>
            <button onClick={removeImage}>Remove</button>
          </div>
          <img src={newImage} />
        </div>
      )}
      <input
        type='file'
        accept='image/*'
        id='imageUpload'
        onChange={handleNewImageChange}
        ref={imageInputRef}
        className={styles['hide']}
      />
      <label
        htmlFor='imageUpload'
        className={styles['new-message-file-input-field']}
      >
        Upload Image
      </label>

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
