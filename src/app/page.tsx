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

export default function Home() {
  const [memoryList, setMemoryList] = useState<Array<memObj>>();
  // const testingMemory = {
  //   name: "Testing File",
  //   tags: ["Lucille", "Bill", "Sandy", "Jim", "Paul"],
  //   year: 1958,
  //   description: "This is a test desciption",
  //   pic: { testImg },
  // };

  //   const starCountRef = ref(db, 'posts/' + "The Farm" + '/starCount');
  //   onValue(starCountRef, (snapshot) => {
  //   const data = snapshot.val();
  //   updateStarCount(postElement, data);
  // });

  //todo add memoires to firebase
  //todo change map to memory
  //todo fix spacing on images (Image component)

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const boardRef = databaseRef(db, "Memories/");
    let displayArray: Array<memObj> = [];
    await onValue(
      boardRef,
      (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          const childKey = childSnapShot.key;
          const childData = childSnapShot.val();
          let obj = {
            title: childData.title,
            image: childData.image,
            tags: childData.tags,
            description: childData.description,
            year: childData.year,
          };
          addData(obj);
        });
      },
      {
        onlyOnce: false,
      }
    );

    function addData(obj: memObj) {
      displayArray.push(obj);
      setMemoryList(displayArray);
      console.log(displayArray);
    }
  }

  return (
    <main className={styles.main}>
      <Memory
        pic={orch}
        description="Nana's high school orchestra. She is in the 3rd row from the right, the 4th girl up. She played the viola."
        title="Orchestra Concert"
        year=""
        tags={["Nana"]}
      />
      <Memory
        pic={christening}
        description="Jim's christening party. From the left: great aunt Ella, grandma Esther Zoschke,  uncle David Z, grandma Bertha Hintz and grandpa Paul H, Sr."
        title="Jim's Christening"
        year=""
        tags={["Ella", "Esther", "David", "Bertha", "Paul Sr."]}
      />
      <Memory
        pic={walter}
        description="Nana's cousin Walter Z with grandpa Wilhelm (or William) Z at grandma and grandpa's 50th anniversary. Walter gave Nana a blood transfusion when her appendix burst, helping to save her life. He was a bus driver, but sadly had a heart attack and died fairly young at 62."
        title="Walter Zoschke and Grandpa Wilhelm"
        year=""
        tags={["Walter", "Wilhelm"]}
      />
      <Memory
        pic={santa}
        description="Jim in '57. Do you recognize the visitor in the living room?"
        title="The Infamous Santa"
        year="1957"
        tags={["Jim"]}
      />
      <Memory
        pic={farm}
        description="The farm which was a Christmas gift that year. It was so long ago that the window Bill is leaning on hadn't been removed yet to make space for the family room."
        title="The Farm"
        year=""
        tags={["Bill"]}
      />

      {/* {memoryList?.map((val, index) => {
        console.log(val.title);
        return (
          <div key={val.title}>
            {val.title}
            {val.description}
          </div>
        );
      })} */}
    </main>
  );
}
