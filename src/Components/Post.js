import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import "../Styles/Post.css";
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";

function Post({ user = null, db = null, storage, dummy }) {
  const [post, setPost] = useState(false);
  const [postMassage, setPostMassage] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [imageURL, setImageURL] = useState("");
  const [url, setUrl] = useState("");
  const [btn, setBtn] = useState("UPLOAD");

  const { displayName, photoURL } = user;

  useEffect(() => {
    if (image) {
      setUrl(URL.createObjectURL(image));

      let imgName = `${Date.now()}_${image.name}`;

      const uploadImage = storage.ref(`images/${imgName}`).put(image);

      uploadImage.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {},
        async () => {
          await storage
            .ref("images")
            .child(imgName)
            .getDownloadURL()
            .then((url) => setImageURL(url));
        }
      );
    }
  }, [image,storage]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (db) {
      db.collection("Massage").add({
        text: postMassage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        displayName,
        photoURL,
        image: imageURL,
      });
      setPost(false);
      setPostMassage("");
      setImageURL("");
      setImage("");
      setProgress(0);
      setUrl("");
      setBtn("UPLOAD");

      setTimeout(() => {
        dummy.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  useEffect(() => {
    if (progress === 100) setBtn("POST");
    else if (image) setBtn("UPLOADING...");
  }, [image, progress]);

  return (
    <>
      <div
        className="post-add-post"
        title="Add Post"
        onClick={() => {
          if (post) {
            setPost(false);
            // setPostMassage("");
            // setImageURL("");
            // setImage("");
            // setProgress(0);
            // setUrl("");
            // setBtn("UPLOAD");
          } else {
            setPost(true);
          }
        }}
      >
        {post ? <CloseIcon fontSize="medium" /> : <AddIcon fontSize="medium" />}
      </div>
      <form
        className={post ? "post-bar-show" : "post-bar"}
        onSubmit={handleSubmit}
      >
        <label className="post-image" htmlFor="select">
          Select Image
        </label>
        <input
          id="select"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          hidden
        />
        {image ? <img src={url} width="30%" height="auto" alt="uploaded" /> : null}
        <input
          type="text"
          className="post-post"
          placeholder="Write your thoughts..."
          value={postMassage}
          onChange={(e) => {
            setPostMassage(e.target.value);
          }}
        />
        {progress === 100 ? (
          <button className="post-btn" type="submit">
            {btn}
          </button>
        ) : (
          <button className="post-btn" disabled={true}>
            {btn}
          </button>
        )}
      </form>
    </>
  );
}

export default Post;
