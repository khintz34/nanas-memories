import Image from "next/image";
import styles from "../Memory/Memory.module.scss";

export default function Memory(props: any) {
  return (
    <main className={styles.main}>
      <div className={styles.divMain}>
        <Image
          height={250}
          width={325}
          src={props.pic}
          alt={props.desciption}
        />
      </div>
      <div className={`${styles.divMain} ${styles.info}`}>
        <h2 className={styles.h2}>
          {props.title} · {props.year}
        </h2>
        <div className={styles.desc}>{props.description}</div>
      </div>
    </main>
  );
}
