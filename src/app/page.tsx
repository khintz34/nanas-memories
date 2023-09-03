"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import Memory from "@/components/Memory/Memory";
import { Memory as memObj } from "../assets/objects/originalObj";
import { ref as databaseRef, onValue } from "firebase/database";
import { db } from "../assets/firebase/firebase";
import { useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

//todo fix spacing on images (Image component) instead of img
// todo create a filter function

export default function Home() {
  const [memoryList, setMemoryList] = useState<Array<memObj>>();
  const [tags, setTags] = useState<Array<string>>([]);

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const boardRef = databaseRef(db, "Memories/");
    let displayArray: Array<memObj> = [];
    onValue(
      boardRef,
      (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          const childKey = childSnapShot.key;
          const childData = childSnapShot.val();
          let obj = {
            title: childData.title,
            url: childData.url,
            tags: childData.tags,
            description: childData.description,
            year: childData.year,
            image: "",
          };

          const storage = getStorage();
          const specRef = ref(storage, obj.url);

          //todo fix this

          const fetchData = async () => {
            const result = await getDownloadURL(specRef);
            obj.image = result;
            addData(obj);
          };
          fetchData();
        });
      },
      {
        onlyOnce: false,
      }
    );

    function addData(obj: memObj) {
      if (obj.tags.length > 0) {
        createTagsList(obj.tags);
      }
      displayArray.push(obj);
      setMemoryList([...displayArray]);
    }

    //todo fix this to add to Tags when there is a new value

    function createTagsList(list: any) {
      let beginList = list.split(",");
      console.log(beginList);
      let holding = [...tags];
      if (beginList.length !== 0) {
        beginList.map((val: string, index: number) => {
          if (!tags.includes(val)) {
            holding.push(val);
          }
        });
      }
      setTags(holding);
    }
  }

  useEffect(() => {
    console.log("useEffect");
    console.log(tags);
  }, [tags]);

  return (
    <main className={styles.main}>
      {typeof memoryList !== "undefined" ? (
        memoryList.map((val, index) => {
          return (
            <Memory
              key={val.title}
              pic={val.image}
              description={val.description}
              title={val.title}
              year={val.year}
              tags={val.tags}
            />
          );
        })
      ) : (
        <div className={styles.center}>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
        </div>
      )}
    </main>
  );
}
