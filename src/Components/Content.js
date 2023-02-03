import { useEffect, useState } from "react";
import "../Styles/Content.css";
import { formatRelative } from "date-fns";

function Content({ dummy, db = null }) {
  const [massages, setMassages] = useState([]);

  useEffect(() => {
    if (db) {
      db.collection("Massage")
        .orderBy("createdAt")
        .onSnapshot((snapshot) => {
          setMassages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [db]);

  return (
    <div className="content-main-box">
      {massages.map((msg, i) => {
        return (
          <div className="content-boxes" key={i}>
            <div className="content-header">
              <div className="content-header-user">
                <img
                  src={msg.photoURL}
                  alt="profile"
                  className="content-profile-pic"
                />
                <span className="content-profile-name">{msg.displayName}</span>
              </div>
              {msg.createdAt?.seconds ? (
                <span className="content-header-time">
                  {formatRelative(
                    new Date(msg.createdAt.seconds * 1000),
                    new Date()
                  )}
                </span>
              ) : null}
            </div>
            <img
              className="content-img"
              src={msg.image}
              width="100%"
              height="auto"
              alt="content"
            />

            {msg.text ? (
              <p className="content-text">{msg.text}</p>
            ) : (
              <span className="content-img-no-text"></span>
            )}
            <div ref={dummy}></div>
          </div>
        );
      })}
    </div>
  );
}

export default Content;
