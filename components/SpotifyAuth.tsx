import querystring from 'querystring';
import React from 'react';
import { generateChallenge, generateRandomString } from '../utils/spotify/crypto';

const SPOTIFY_SCOPE = 'user-read-private user-read-email';
const CLIENT_ID = 'a26533af9e8f41d3b352602e9099900f';

const getUrlPath = (): string => {
  const {protocol, hostname, port} = window.location;
  return protocol + '//' + hostname + (port ? ':' : '') + port;
};

export default function SpotifyAuth(): JSX.Element {

  const login = async () => {
    const storage = window.localStorage;

    const state = generateRandomString(16);
    storage.setItem('spotify-state', state);


    const {code_challenge, code_verifier} = await generateChallenge();

    storage.setItem('spotify-code-verifier', code_verifier);

    const authUrl = 'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: SPOTIFY_SCOPE,
        redirect_uri: getUrlPath() + '/callback',
        state: state,
        code_challenge,
        code_challenge_method: 'S256',
      });

    window.open(authUrl, 'Login with Spotify', 'width=800,height=600');
  };

  return (
    <button onClick={login}>Log in to Spotify</button>
  );
}