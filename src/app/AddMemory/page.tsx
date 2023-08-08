import Image from "next/image";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <h2>Add a Memory</h2>
      <form action="">
        <label htmlFor="memName">Memory Name</label>
        <input type="text" id="memName" />
      </form>
    </main>
  );
}
