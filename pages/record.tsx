import React, { useState } from 'react';
import Layout from '../components/Layout';
import RecordPlayer, { RECORD_PLAYER_ACTIONS } from '../components/RecordPlayer';
import SpotifyAuth from '../components/SpotifyAuth';

export default function Record(): JSX.Element {
  const [action, setAction] = useState(RECORD_PLAYER_ACTIONS.INIT);
  return (
    <Layout>
      <div>
        <RecordPlayer action={action} song={'5WkCcSa78lM1Ym4LXzJUiN'}/>
      </div>
      <div>
        <button onClick={() => setAction(RECORD_PLAYER_ACTIONS.PLAY)}>PLAY</button>
        <br/>
        <button onClick={() => setAction(RECORD_PLAYER_ACTIONS.PAUSE)}>PAUSE</button>
        <br/>
        <button onClick={() => setAction(RECORD_PLAYER_ACTIONS.RESTART)}>RESTART</button>
      </div>
      <SpotifyAuth />
    </Layout>
  );
}