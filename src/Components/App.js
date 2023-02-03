import "../Styles/App.css";
import { useEffect, useRef, useState } from "react";
import Nav from "./Nav";
import Post from "./Post";
import Content from "./Content";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

firebase.initializeApp({
//  Firebase initialization
});

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
      else setUser(null);
      if (initializing) setInitializing(false);
    });
    return unsub;
  });

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await auth.signInWithPopup(provider);
    } catch (e) {}
  };

  const dummy = useRef();

  if (initializing) return <h1 className="loading">Loading...</h1>;

  return (
    <div className={dark ? `app app-dark` : `app`}>
      {user ? (
        <div className="app-app">
          <Nav user={user} setDark={setDark} dark={dark} />
          <div className="app-sections">
            <Content db={db} dummy={dummy} />
          </div>
          <Post user={user} db={db} storage={storage} dummy={dummy} />
        </div>
      ) : (
        <div className="start">
          <div className="start-info">
            <h1 className="start-logo">Tw</h1>
            <div className="start-welcome">
              <h1 className="start-header">
                Welcome to
                <span className="start-name">Tweeter</span>
              </h1>
            </div>
          </div>
          <div className="start-btn" onClick={signInWithGoogle}>
            Sign in with Google
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
