import Image from "next/image";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <h2 className={styles.h2}>Add a Memory</h2>
      <form action="" className={styles.form}>
        <div className={styles.inputContainer}>
          <label htmlFor="memName">Memory Name</label>
          <input type="text" id="memName" />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="memTags">
            Who is in this memory? (Separate with commas)
          </label>
          <input type="text" id="memTags" />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="memYear">Year (optional)</label>
          <input type="text" id="memYear" />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="memDesc">Description</label>
          <textarea id="memDesc" className={styles.textArea} />
        </div>
      </form>
    </main>
  );
}
