import Image from "next/image";
import styles from "../Memory/Memory.module.scss";

export default function Memory(props: any) {
  return (
    <main className={styles.main}>
      <Image height={250} width={325} src={props.pic} alt={props.desciption} />
      <div>
        <h2>
          {props.title} · {props.year}
        </h2>
        <div>{props.description}</div>
      </div>
    </main>
  );
}
