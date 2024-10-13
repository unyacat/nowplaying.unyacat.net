import React, { useState, useEffect } from 'react';
import { getTokenFromUrl} from "./Spotify";
import Login from './Login';
import LoggedIn from './LoggedIn';
import './App.css';

function App() {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const token = getTokenFromUrl();
    window.location.hash = "";

    // ログイン後の callback の場合
    // token を取得
    if (token) {
      setAccessToken(token)
      localStorage.setItem("accessToken", token)
    }

    // 一度ログインしたことがあり、トークンが残っている場合
    // トークンが有効か確認し、無効だった場合は再ログインとなる
    if (localStorage.getItem("accessToken")) {
      fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
        }
      })
      .then(response => {
        console.log(response)
        if (response.ok) {
          setAccessToken(localStorage.getItem("accessToken") as string);
        } else {
          localStorage.removeItem("accessToken");
        }
      })
      .catch(() => {
        localStorage.removeItem("accessToken");
      });
    }
  }, [])

  return (
    <div className="App">
      { accessToken ?
      <LoggedIn accessToken={accessToken} />
      :
      <Login />
      }
    </div>
  );
}

export default App;
