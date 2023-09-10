"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import Memory from "@/components/Memory/Memory";
import { Memory as memObj } from "../assets/objects/originalObj";
import { ref as databaseRef, onValue } from "firebase/database";
import { db } from "../assets/firebase/firebase";
import { useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { StringDecoder } from "string_decoder";

//todo fix spacing on images (Image component) instead of img
// todo create a filter function

export default function Home() {
  const [memoryList, setMemoryList] = useState<Array<memObj>>();
  const [tags, setTags] = useState<Array<string>>([]);
  const location: string = "_location";
  const [selectedValue, setSelectedValue] = useState<string>("");

  useEffect(() => {
    getUserData("");
  }, []);

  async function getUserData(tag: string) {
    let holdingArray: Array<string> = [];
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

          const fetchData = async () => {
            const result = await getDownloadURL(specRef);
            obj.image = result;
            addData(obj, tag);
          };

          if (obj.url !== undefined) fetchData();
        });
      },
      {
        onlyOnce: false,
      }
    );

    function addData(obj: memObj, tag: string) {
      if (obj.tags.length > 0) {
        createTagsList(obj.tags);
      }

      if (tag === "") {
        displayArray.push(obj);
        setMemoryList([...displayArray]);
      } else {
        if (updateDisplayArray(tag, obj, obj.tags)) {
          displayArray.push(obj);
          setMemoryList([...displayArray]);
        }
      }
    }

    function createTagsList(list: any) {
      let beginList = list.split(", ");
      if (beginList.length !== 0) {
        beginList.map((val: string, index: number) => {
          if (!holdingArray.includes(val)) {
            if (val !== " ") {
              if (val === "Nana" || val === "nana") {
                if (!holdingArray.includes("Lucille"))
                  holdingArray.push("Lucille");
              } else {
                holdingArray.push(val);
              }
            }
          }
        });
      }
      const newArray = [...holdingArray];
      setTags(newArray);
    }

    function updateDisplayArray(tag: string, obj: memObj, list: any) {
      let found = false;
      let beginList: any = list.split(", ");
      if (beginList.length !== 0) {
        beginList.map((val: string, index: number) => {
          if (val === tag) {
            found = true;
          }
        });
      }
      return found;
    }
  }

  return (
    <main className={styles.main}>
      {typeof memoryList !== "undefined" ? (
        <div>
          <div className={styles.selectContainer}>
            <div className={styles.selectDiv}>
              <label htmlFor="person-select">Filter By Person</label>
              <select
                name="person-select"
                id="person-select"
                className={styles.select}
                onChange={(e) => {
                  getUserData(e.target.value);
                  // e.target.setAttribute("selected", "selected");
                  setSelectedValue(e.target.value);
                }}
                value={selectedValue}
              >
                <option value="">ALL</option>

                {tags.map((val, index) => {
                  return <option key={`${val}-${index}`}>{val}</option>;
                })}
              </select>
            </div>
          </div>
          {memoryList.map((val, index) => {
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
          })}
        </div>
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
