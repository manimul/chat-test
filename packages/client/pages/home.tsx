import React, { ChangeEvent, ReactElement } from 'react';
import Link from 'next/link';

import styles from './home.module.css';

const Home = (): ReactElement => {
  const [roomName, setRoomName] = React.useState('');

  const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  return (
    <div className={styles['home-container']}>
      <input
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomNameChange}
        className={styles['text-input-field']}
      />
      <Link href={`/chat/${roomName}`}>
        <a className={styles['enter-room-button']}>Join room</a>
      </Link>
    </div>
  );
};

export default Home;
