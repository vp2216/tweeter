import "../Styles/Nav.css";
import { VscColorMode } from "react-icons/vsc";
import { MdLogout } from "react-icons/md";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

function Nav({ user, setDark, dark }) {
  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {}
  };

  const { displayName, photoURL } = user;

  const changeTheam = () => {
    if (dark) setDark(false);
    else setDark(true);
  };

  return (
    <div className="nav-bar">
      <div className="nav-name">
        <h1 className="nav-logo">Tw</h1>
        <h2 className="nav-tweeter">Tweeter</h2>
      </div>

      <div className="nav-first">
        <span className="nav-icon icon-large-screen" onClick={changeTheam}>
          Change Theme
        </span>
        {dark ? (
          <VscColorMode
            className="nav-icon icon-small-screen nav-icon-dark"
            onClick={changeTheam}
          />
        ) : (
          <VscColorMode
            className="nav-icon icon-small-screen"
            onClick={changeTheam}
          />
        )}
        <span className="nav-icon icon-large-screen" onClick={signOut}>
          Logout
        </span>
        
          <MdLogout className="nav-icon icon-small-screen" onClick={signOut} />
        
        <img
          src={photoURL}
          alt="profile"
          height="50px"
          width="50px"
          className="nav-profile"
        />
        <h3 className="nav-user-name">{displayName}</h3>
      </div>
    </div>
  );
}

export default Nav;
