import Image from "next/image";
import styles from "../Memory/Memory.module.scss";

//todo use Image component --> has to do with hostname in next.config.js

export default function Memory(props: any) {
  return (
    <main className={styles.main}>
      <div className={styles.imageContainer}>
        {/* <Image
          height={250}
          width={325}
          src={props.pic}
          alt={props.desciption}
        /> */}
        <img src={props.pic} />
      </div>
      <div className={`${styles.divMain} ${styles.info}`}>
        {props.year === "" ? (
          <h2 className={styles.h2}>{props.title}</h2>
        ) : (
          <h2 className={styles.h2}>
            {props.title} · {props.year}
          </h2>
        )}

        <div className={styles.desc}>{props.description}</div>
      </div>
    </main>
  );
}
