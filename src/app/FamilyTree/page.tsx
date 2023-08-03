import styles from "./page.module.scss";
import Image from "next/image";
import tree from "../../assets/images/familyTree.png";

export default function Home() {
  return (
    <main className={styles.main}>
      <Image height={500} width={800} src={tree} alt="Nana's Family Tree" />
    </main>
  );
}
