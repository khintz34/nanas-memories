"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import { useEffect, useRef, useState, useContext } from "react";
import { ref as ref2, uploadBytes } from "firebase/storage";
import { storage } from "../../assets/firebase/firebase";
import { getDatabase, push, ref, set } from "firebase/database";
import { db } from "../../assets/firebase/firebase";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useAuthStore } from "../../stores/authStore";
import { AuthContext } from "@/contexts/authContext";

// todo add auth --> it keeps refreshing and not signing in

export default function Home() {
  const [currentAuth, setCurrentAuth] = useState(false);
  const [memUrl, setMemUrl] = useState<string>("");
  const [memImage, setMemImage] = useState<any>();
  const [memName, setMemName] = useState<string>("");
  const [memTags, setMemTags] = useState<string>("");
  const [memYear, setMemYear] = useState<string>("");
  const [memDesc, setMemDesc] = useState<string>("");
  const [memStatus, setMemStatus] = useState<string>("");
  const [memStatusStyles, setMemStatusStyles] = useState<string>(
    `${styles.hide}`
  );
  const imgRef = useRef<any>(null);
  const authStatus = useAuthStore((state) => state.authtatus);
  const changeStatus = useAuthStore((state) => state.changeStatus);
  const { auth, setAuth } = useContext(AuthContext);

  const handleImage = (e: any) => {
    setMemUrl(e.target.files[0].name);
    setMemImage(e.target.files[0]);
    setMemStatusStyles(`${styles.hide}`);
  };

  const uploadImage = () => {
    const imageRef = ref2(storage, memUrl);
    uploadBytes(imageRef, memImage).catch((error) => {
      console.log(error);
      setMemStatus("Image Uploaded Unsuccessfully... try again. ");
      setMemStatusStyles(`${styles.show}`);
    });
  };
  function writeUserData(e: any) {
    e.preventDefault();

    const database = getDatabase();
    set(ref(database, "Memories/" + memName), {
      title: memName,
      description: memDesc,
      year: memYear,
      tags: memTags,
      url: memUrl,
    })
      .then(() => {
        setMemStatus("Image Uploaded Successfully");
        setMemStatusStyles(`${styles.show}`);
        uploadImage();
      })
      .then(() => {
        setMemDesc("");
        setMemImage("");
        setMemName("");
        setMemTags("");
        setMemUrl("");
        setMemYear("");
        imgRef.current.value = "";
      })
      .catch((error) => {
        console.log(error);
        setMemStatus("Image Uploaded Unsuccessfully... try again. ");
        setMemStatusStyles(`${styles.show}`);
      });
  }

  const signUserIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault;
    const provider = new GoogleAuthProvider();
    const auth1 = getAuth();
    if (!auth) {
      signInWithPopup(auth1, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          if (credential !== null) {
            const token = credential.accessToken;
          }
          // The signed-in user info.
          const user = result.user;
          changeStatus(true);
          setCurrentAuth(true);
          setAuth(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      auth1.signOut().then(
        function () {
          changeStatus(false);
          setAuth(false);
        },
        function (error) {
          console.error("Sign Out Error", error);
        }
      );
    }
  };

  useEffect(() => {
    if (auth) {
      setCurrentAuth(true);
    }
  }, []);

  return (
    <main className={styles.main}>
      {auth ? (
        <div>
          <h2 className={styles.h2}>Add a Memory</h2>
          <form action="" className={styles.form}>
            <div className={styles.inputContainer}>
              <label htmlFor="memName">Memory Title</label>
              <input
                type="text"
                id="memName"
                onChange={(e) => {
                  setMemName(e.target.value);
                  setMemStatusStyles(`${styles.hide}`);
                }}
                className={` ${styles.input} ${styles.textInput}`}
                value={memName}
                onClick={() => setMemStatusStyles(`${styles.show}`)}
                maxLength={25}
              />
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="memTags">
                Who is in this memory? (Separate with commas)
              </label>
              <input
                type="text"
                id="memTags"
                onChange={(e) => {
                  setMemTags(e.target.value);
                  setMemStatusStyles(`${styles.hide}`);
                }}
                className={` ${styles.input} ${styles.textInput}`}
                value={memTags}
                onClick={() => setMemStatusStyles(`${styles.show}`)}
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="memYear">Year (optional)</label>
              <input
                type="text"
                id="memYear"
                onChange={(e) => {
                  setMemYear(e.target.value);
                  setMemStatusStyles(`${styles.hide}`);
                }}
                className={` ${styles.input} ${styles.yearInput}`}
                value={memYear}
                onClick={() => setMemStatusStyles(`${styles.show}`)}
                maxLength={4}
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="memDesc">Description</label>
              <textarea
                id="memDesc"
                className={`${styles.textArea} ${styles.input} ${styles.descInput}`}
                onChange={(e) => {
                  setMemDesc(e.target.value);
                  setMemStatusStyles(`${styles.hide}`);
                }}
                value={memDesc}
                onClick={() => setMemStatusStyles(`${styles.show}`)}
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="memImg">Image</label>
              <input
                type="file"
                id="memImg"
                onChange={(e) => handleImage(e)}
                ref={imgRef}
              />
            </div>
            <div className={styles.btnContainer}>
              <button
                type="submit"
                onClick={(e) => writeUserData(e)}
                className={styles.btn}
              >
                Add Memory
              </button>
            </div>
          </form>
          <div className={memStatusStyles}>{memStatus}</div>
        </div>
      ) : (
        <div className={styles.signInContainer}>
          <div>
            Before adding a memory of Nana, please sign in using a Gmail
            account.{" "}
          </div>
          <button onClick={(e) => signUserIn(e)} className={styles.signIn}>
            Sign In
          </button>
        </div>
      )}
    </main>
  );
}
