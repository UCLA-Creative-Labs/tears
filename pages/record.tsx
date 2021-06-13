import React from 'react';
import Layout from '../components/Layout';
import RecordPlayer from '../components/RecordPlayer';

export default function Record(): JSX.Element {

  return (
    <Layout>
      <div>
        <RecordPlayer />
      </div>
    </Layout>
  );
}