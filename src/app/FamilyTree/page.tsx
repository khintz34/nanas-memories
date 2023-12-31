"use client";

import styles from "./page.module.scss";
import Image from "next/image";
import tree from "../../assets/images/familyTree.png";
import { useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import Member from "@/components/Member/Member";

export default function Home() {
  const [mobile, setMobile] = useState(false);
  const [down, setDown] = useState(true);
  const [hidden, setHidden] = useState(`${styles.hide}`);

  function handleToggle() {
    if (down) {
      setDown(false);
      setHidden(`${styles.show}`);
    } else {
      setDown(true);
      setHidden(`${styles.hide}`);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth > 1000) {
        setMobile(false);
      } else {
        setMobile(true);
      }
    }
  }, []);

  return (
    <main className={styles.main}>
      <h2>Nana&apos;s Family Tree</h2>

      {mobile ? (
        <div className={styles.treeMain}>
          <Member
            relationship="Grandparents"
            people={[
              { name: "Charles Zoschke", rel: "Grandpa - Paternal" },
              { name: "Henrietta Kroggel", rel: "Grandma  - Paternal" },
              { name: "Charles Wilhelm", rel: "Grandpa  - Maternal" },
              { name: "Bertha Neitzel", rel: "Grandma  - Maternal" },
            ]}
          />
          <Member
            relationship="Parents"
            people={[
              { name: "Esther Zoschke", rel: "Mom" },
              { name: "Wilhelm Zoschke", rel: "Dad" },
            ]}
          />
          <Member
            relationship="Siblings"
            people={[
              { name: "Russel Zoschke", rel: "Brother" },
              { name: "Dorothy Zoschke (Earnest Daufenbauc)", rel: "Sister" },
              { name: "David Zoschke (Carole)", rel: "Brother" },
            ]}
          />
          <Member
            relationship="Aunts/Uncles"
            people={[
              { name: "Paul Zoschke", rel: "Uncle - Paternal" },
              { name: "Frank Zoschke", rel: "Uncle - Paternal" },
              { name: "Elizabeth Zoschke", rel: "Aunt - Paternal" },
              { name: "Max Zoschke", rel: "Uncle - Paternal" },
              { name: "Frieda Zoschke", rel: "Aunt - Paternal" },
              {
                name: "Margareta Zoschke (Arthur Tetzlaff)",
                rel: "Aunt - Paternal",
              },
              { name: "Anna Wilhelm", rel: "Aunt - Maternal" },
              { name: "Bertha Wilhelm", rel: "Aunt - Maternal" },
              { name: "Ella Wilhelm", rel: "Aunt - Maternal" },
            ]}
          />
          <Member
            relationship="Children"
            people={[
              { name: "James Hintz", rel: "Son" },
              { name: "William Hintz (Susan Zadra)", rel: "Son" },
              { name: "Sandra Hintz (Robin Woller)", rel: "Daughter" },
            ]}
          />
          <Member
            relationship="Grandchildren"
            people={[
              { name: "Alex Hintz (Melissa Clark)", rel: "Grandson" },
              { name: "Kevin Hintz (Hadley Cookson)", rel: "Grandson" },
              { name: "Andrew Hintz", rel: "Grandson" },
            ]}
          />
          <Member
            relationship="Great Grandchildren"
            people={[
              { name: "Ella Hintz (Alex/Melissa)", rel: "Great Granddaughter" },
              { name: "Beckham Hintz (Kevin/Hadley)", rel: "Great Grandson" },
              { name: "Leo Hintz (Alex/Melissa)", rel: "Great Grandson" },
            ]}
          />
        </div>
      ) : (
        <Image
          height={500}
          width={750}
          src={tree}
          alt="Nana's Family Tree Large"
        />
      )}
    </main>
  );
}
