import Head from 'next/head';
import React, { useState } from 'react';
import { Song } from '../utils';
// Must specify to /constants because notion requires 'fs'
import { FAVICON } from '../utils/constants';
import RecordPlayer, { RECORD_PLAYER_ACTIONS } from './RecordPlayer';

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
  id?: string;
  title?: string;
  description?: string;
  song: Song;
}

export default function Layout(props: LayoutProps): JSX.Element {
  const [action, setAction] = useState(RECORD_PLAYER_ACTIONS.INIT);
  const title = `${props.title ?? 'Senior Deds'} | Creative Labs`;
  const description = props.description ?? 'A website dedicated to our amazing 2021 seniors. You all will be very missed.';
  const {audioPath, imagePath, title: songTitle, artist} = props.song;
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="title" content={title} />
        <meta name="description" content={description}/>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://deds-21.creativelabsucla.com/" />
        <meta property="og:title" content={title} />
        <meta property="og:description"  content={description} />
        <meta property="og:image" content="https://assets.creativelabsucla.com/metadata.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content="https://assets.creativelabsucla.com/metadata.png" />

        <title>{title}</title>
        <link rel="icon" href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${FAVICON}</text></svg>`}></link>
      </Head>
      <main id={props.id}>
        {props.children}
        <div>
          <p>now playing: {songTitle}</p>
          <p>by: {artist}</p>
          <RecordPlayer action={action} audioPath={audioPath} imagePath={imagePath}/>
          <button onClick={() => setAction(RECORD_PLAYER_ACTIONS.PLAY)}>PLAY</button>
          <br/>
          <button onClick={() => setAction(RECORD_PLAYER_ACTIONS.PAUSE)}>PAUSE</button>
          <br/>
          <button onClick={() => setAction(RECORD_PLAYER_ACTIONS.RESTART)}>RESTART</button>
        </div>
        <div>
         
        </div>
      </main>
    </>
  );
}