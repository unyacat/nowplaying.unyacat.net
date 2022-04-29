import { accessUrl } from "./Spotify";

function Login() {
  function spotifyOauth(){
    window.location.href = accessUrl;
  }

  return (
    <div>
      <h2>Spotify から #nowplaying を取得します</h2>
      <button onClick={spotifyOauth} className="login">Spotifyでログイン</button>
    </div>
  );
}

export default Login
