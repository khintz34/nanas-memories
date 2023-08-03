"use client";

import styles from "./page.module.scss";
import Image from "next/image";
import tree from "../../assets/images/familyTree.png";
import { useEffect, useState } from "react";

export default function Home() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 700) {
      setMobile(false);
    } else {
      setMobile(true);
    }
  }, []);

  return (
    <main className={styles.main}>
      {mobile ? (
        <Image height={250} width={400} src={tree} alt="Nana's Family Tree" />
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
