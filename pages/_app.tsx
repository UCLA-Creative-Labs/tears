import {AppProps} from 'next/app';
import ScriptLoader from 'next/dist/client/experimental-script';
import React, { createContext, useEffect, useState } from 'react';
import '../styles/globals.scss';

export interface IAppContext {
  accessToken?: string;
  refreshToken?: string;
  isAuthenticated: boolean;
  playSong: (id: string) => void;
}

export const AppContext = createContext<IAppContext>({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  playSong: (id: string) => null,
});


function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [ accessToken, setAccessToken ] = useState<string | null> (null);
  const [ refreshToken, setRefreshToken ] = useState<string | null> (null);
  const [ isAuthenticated, setIsAuthenticated ] = useState (false);
  const [ isPlaybackReady, setIsPlaybackReady ] = useState (false);
  const [ spotifyPlayer, setSpotifyPlayer ] = useState(null);
  const [deviceId, setDeviceId] = useState<string | null> (null);

  useEffect(() => {
    const registerSpotifyAuth = () => {
      const storage = window.localStorage;
      const _at = storage.getItem('spotify-access-token');
      const _rt = storage.getItem('spotify-refresh-token');

      _at && setAccessToken(_at);
      _rt && setRefreshToken(_rt);
      setIsAuthenticated(!!(_at && _rt));
    };

    window.addEventListener('storage', registerSpotifyAuth);

    registerSpotifyAuth();

    return () => {
      window.removeEventListener('storage', registerSpotifyAuth);
      if (spotifyPlayer) spotifyPlayer.disconnect();
    }
  }, []);

  useEffect(() => {
    if (!isPlaybackReady) return;
    console.log(accessToken);
    setSpotifyPlayer(new Spotify.Player({
      name: 'CL Deds 2021 Player',
      getOAuthToken: cb => cb(accessToken),
      volume: 0.5,
    }));
  }, [accessToken, isPlaybackReady]);

  useEffect(() => {
    spotifyPlayer?.addListener('ready', ({ device_id }) => {
      setDeviceId(device_id);
    });
  }, [spotifyPlayer]);

  const playSong = (song_id: string) => {
    if (!spotifyPlayer || !deviceId) return;
    const {_options: {getOAuthToken}} = spotifyPlayer;

    const spotify_uri = `spotify:track:${song_id}`;
    getOAuthToken(access_token => {
      window.fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [spotify_uri] }),
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
        },
      });
    });
  };


  useEffect(() => {
    if (!spotifyPlayer) return;
    spotifyPlayer.connect();
  }, [spotifyPlayer])

  return (
    <AppContext.Provider value={{
      accessToken,
      refreshToken,
      isAuthenticated,
      playSong,
    }}>
      <ScriptLoader
        src={'https://sdk.scdn.co/spotify-player.js'}
        onLoad={() => {
          window.onSpotifyWebPlaybackSDKReady = () => {
            setIsPlaybackReady(true);
          }
        }}/>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
