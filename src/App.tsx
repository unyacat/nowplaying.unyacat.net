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

    if (localStorage.getItem("accessToken")) {
      setAccessToken(localStorage.getItem("accessToken") as string)
    }

    if (token) {
      setAccessToken(token)
      localStorage.setItem("accessToken", token)
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
