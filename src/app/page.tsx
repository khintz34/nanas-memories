"use client";

import Image from "next/image";
import styles from "./page.module.css";
import orch from "../assets/images/orch.jpeg";
import christening from "../assets/images/christening.jpeg";
import farm from "../assets/images/farm.jpeg";
import santa from "../assets/images/santa.jpeg";
import walter from "../assets/images/walter.jpeg";
import Memory from "@/components/Memory/Memory";
import { Memory as memObj } from "../assets/objects/originalObj";
import { ref as databaseRef, onValue } from "firebase/database";
import { db } from "../assets/firebase/firebase";
import { useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

//todo add memoires to firebase
//todo change map to memory
//todo fix spacing on images (Image component)

export default function Home() {
  const [memoryList, setMemoryList] = useState<Array<memObj>>();

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
      console.log("adding: ", obj);
      displayArray.push(obj);
      setMemoryList(displayArray);
    }
  }

  useEffect(() => {
    console.log("List", memoryList);
  }, [memoryList]);

  return (
    <main className={styles.main}>
      {/* <Memory
        pic={orch}
        description="Nana's high school orchestra. She is in the 3rd row from the right, the 4th girl up. She played the viola."
        title="Orchestra Concert"
        year=""
        tags={["Nana"]}
        /> */}

      {typeof memoryList !== "undefined" ? (
        memoryList.map((val, index) => {
          console.log(index, val.title);
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
        <div>Loading</div>
      )}
    </main>
  );
}
