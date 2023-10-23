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
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useAuthStore } from "../../stores/authStore";
import { AuthContext } from "@/contexts/authContext";
import { STRING_LITERAL_DROP_BUNDLE } from "next/dist/shared/lib/constants";

export default function Home() {
  const [currentAuth, setCurrentAuth] = useState(false);
  const [memUrl, setMemUrl] = useState<string>("");
  const [memImage, setMemImage] = useState<any>();
  const [memName, setMemName] = useState<string>("");
  const [memTags, setMemTags] = useState<string>("");
  const [memYear, setMemYear] = useState<string>("");
  const [memDesc, setMemDesc] = useState<string>("");
  const [memStatus, setMemStatus] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signInError, setSignInError] = useState<boolean>(false);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);
  const [memStatusStyles, setMemStatusStyles] = useState<string>(
    `${styles.hide}`
  );
  const imgRef = useRef<any>(null);
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    if (
      memName === undefined ||
      memName === "" ||
      memImage === undefined ||
      memImage === "" ||
      memDesc === undefined ||
      memDesc === ""
    ) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [memDesc, memName, memImage]);

  const handleImage = (e: any) => {
    // let test = e.target.files[0].name.split(".");
    // console.log(test);
    // let lastElement = test[test.length - 1];
    // let newUrl = memName.replace(/\s/g, "") + "." + lastElement;
    // console.log(newUrl);
    setMemUrl(e.target.files[0].name);
    setMemImage(e.target.files[0]);
    setMemStatusStyles(`${styles.hide}`);
  };

  const uploadImage = (newUrl: string) => {
    //! this is where I need to edit this.
    const imageRef = ref2(storage, newUrl);
    uploadBytes(imageRef, memImage).catch((error) => {
      setMemStatus("Image Uploaded Unsuccessfully... try again. ");
      setMemStatusStyles(`${styles.show}`);
    });
  };
  function writeUserData(e: any) {
    e.preventDefault();

    console.log(memUrl.split(".")[0]);
    let newUrl: string;

    if (memUrl.split(".")[0] === "image") {
      let urlArr = memUrl.split(".");
      let lastElement = urlArr[urlArr.length - 1];
      newUrl = memName.replace(/\s/g, "") + "." + lastElement;
      console.log(newUrl);
    } else {
      newUrl = memUrl;
    }

    const database = getDatabase();
    set(ref(database, "Memories/" + memName), {
      title: memName,
      description: memDesc,
      year: memYear,
      tags: memTags,
      url: newUrl,
    })
      .then(() => {
        setMemStatus("Image Uploaded Successfully");
        setMemStatusStyles(`${styles.show}`);
        uploadImage(newUrl);
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
        setMemStatus("Image Uploaded Unsuccessfully... try again. ");
        setMemStatusStyles(`${styles.show}`);
      });
  }

  const signUserIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, "nana@gmail.com", password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setAuth(true);
        setSignInError(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setAuth(false);
        setSignInError(true);
      });
  };

  useEffect(() => {
    if (auth) {
      setCurrentAuth(true);
    }
  }, []);

  return (
    <main className={styles.main}>
      {auth ? (
        <div className={styles.addContainer}>
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
                className={
                  disabledBtn ? `${styles.disabledBtn}` : `${styles.btn}`
                }
                disabled={disabledBtn}
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
            Before adding a memory of Nana, please enter sign in password.{" "}
          </div>
          <form className={styles.emailForm}>
            <div className={styles.emailContainer}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className={` ${styles.input}`}
                value={password}
              />
            </div>

            <div
              className={signInError ? `${styles.showError}` : `${styles.none}`}
            >
              Incorrect Username or Password. Try Again.
            </div>
          </form>
          <button onClick={() => signUserIn()} className={styles.signIn}>
            Sign In
          </button>
        </div>
      )}
    </main>
  );
}
