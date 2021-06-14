import querystring from 'querystring';
import { useRouter } from 'next/dist/client/router';
import React, {useEffect} from 'react';

const CLIENT_ID = 'a26533af9e8f41d3b352602e9099900f';

export default function SpotifyCallback(): JSX.Element {
  const router = useRouter();
  useEffect(() => {
    if (Object.keys(router.query).length === 0) return;

    const {code, state} = router.query;
    const storage = window.localStorage;

    if (state !== storage.getItem('spotify-state')) return;

    void window.fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;',
      },
      body: querystring.stringify({
        client_id: CLIENT_ID,
        grant_type: 'authorization_code',
        redirect_uri: window.location.href.split('?')[0],
        code,
        code_verifier: storage.getItem('spotify-code-verifier'),
      }),
    })
      .then(res => res.json())
      .then(({access_token, refresh_token}) => {
        storage.setItem('spotify-access-token', access_token);
        storage.setItem('spotify-refresh-token', refresh_token);
        window.close();
      });
  }, [router]);

  return (
    <div>You will be rerouted shortly!</div>
  );
}