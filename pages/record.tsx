import React from 'react';
import Layout from '../components/Layout';
import RecordPlayer from '../components/RecordPlayer';
import SpotifyAuth from '../components/SpotifyAuth';

export default function Record(): JSX.Element {

  return (
    <Layout>
      <div>
        <RecordPlayer />
      </div>
      <SpotifyAuth />
    </Layout>
  );
}