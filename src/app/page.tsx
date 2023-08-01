import Image from "next/image";
import styles from "./page.module.css";
import testImg from "../assets/images/testing.jpeg";
import Memory from "@/components/Memory/Memory";

export default function Home() {
  const testingMemory = {
    name: "Testing File",
    tags: ["Lucille", "Bill", "Sandy", "Jim", "Paul"],
    year: 1958,
    description: "This is a test desciption",
    pic: { testImg },
  };

  return (
    <main className={styles.main}>
      <Memory
        pic={testImg}
        description="This is a test Description"
        title="Test Title"
        year="1958"
      />
    </main>
  );
}
