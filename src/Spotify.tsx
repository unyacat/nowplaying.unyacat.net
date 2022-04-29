export const authEndpoint: string = "https://accounts.spotify.com/authorize";

const redirectUri: string = "https://nowplaying.unyacat.net/";

const clientId: string = process.env.REACT_APP_CLIENT_ID as string;

// 対応する範囲を決める
const scopes: string[] = [
  "user-read-currently-playing",
];

export const getTokenFromUrl = () : string | null => {
  if(window.location.hash.length === 0) return null;
  return window.location.hash
    .substring(1)
    .split('&')[0].split('=')[1]
}


// SpotifyのログインページのURL
export const accessUrl: string = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;