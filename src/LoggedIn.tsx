import axios from 'axios';
import React, {useEffect, useState} from 'react'


function LoggedIn(props: any) {
  const [nowPlayingSongText, setNowPlayingSongText] = useState("Not playing...");
  const [nowPlayingSongURL, setNowPlayingSongURL] = useState("");
  async function getNowPlayingText() {
    await axios.get (
    "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${props.accessToken}`
        }
      }
    ).then((response: any) => {
        console.log(response)
        setNowPlayingSongText(
          response.data.item.name + " - " + response.data.item.artists[0].name + " #nowplaying"
        );
        setNowPlayingSongURL(
          response.data.item.external_urls.spotify
        )
      }
    )
  };

  function openTweetWindow() {
    const url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(nowPlayingSongText + " " + nowPlayingSongURL);
    window.open(url, "_blank", "width: 640, height: 480")
  };


  useEffect(() => {
    getNowPlayingText();
  })


  return (
    <div>
      <h1> {nowPlayingSongText} </h1>
      <button onClick={getNowPlayingText} className="reacquisition">再取得</button>
      <button onClick={openTweetWindow} className="tweet">ツイート</button>
    </div>
  )
}

export default LoggedIn
