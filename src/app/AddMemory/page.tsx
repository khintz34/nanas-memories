"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import { useState } from "react";
import { ref as ref2, uploadBytes } from "firebase/storage";
import { storage } from "../../assets/firebase/firebase";
import { getDatabase, push, ref, set } from "firebase/database";
import { db } from "../../assets/firebase/firebase";
import { JSDocNullableType, NumberLiteralType } from "typescript";

export default function Home() {
  const [memUrl, setMemUrl] = useState<string>();
  const [memImage, setMemImage] = useState<any>(null);
  const [memName, setMemName] = useState<string>();
  const [memTags, setMemTags] = useState<string>();
  const [memYear, setMemYear] = useState<string | null>(null);
  const [memDesc, setMemDesc] = useState<string>();

  const handleImage = (e: any) => {
    setMemUrl(e.target.files[0].name);
    setMemImage(e.target.files[0]);
  };

  const uploadImage = () => {
    const imageRef = ref2(storage, memUrl);
    uploadBytes(imageRef, memImage)
      .then(() => {
        console.log(imageRef);
      })
      .catch((error) => {
        console.log(error);
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
        console.log("worked");
      })
      .catch((error) => {
        console.log(error);
      });

    uploadImage();
  }

  return (
    <main className={styles.main}>
      <h2 className={styles.h2}>Add a Memory</h2>
      <form action="" className={styles.form}>
        <div className={styles.inputContainer}>
          <label htmlFor="memName">Memory Name</label>
          <input
            type="text"
            id="memName"
            onChange={(e) => setMemName(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="memTags">
            Who is in this memory? (Separate with commas)
          </label>
          <input
            type="text"
            id="memTags"
            onChange={(e) => setMemTags(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="memYear">Year (optional)</label>
          <input
            type="text"
            id="memYear"
            onChange={(e) => setMemYear(e.target.value)}
            className={styles.input}
            defaultValue=""
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="memDesc">Description</label>
          <textarea
            id="memDesc"
            className={`${styles.textArea} ${styles.input}`}
            onChange={(e) => setMemDesc(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="memImg">Image</label>
          <input type="file" id="memImg" onChange={(e) => handleImage(e)} />
        </div>
        <button
          type="submit"
          onClick={(e) => writeUserData(e)}
          className={styles.btn}
        >
          Upload Memory
        </button>
      </form>
    </main>
  );
}
