import Image from "next/image";
import styles from "./page.module.scss";
import Question from "@/components/Question/Question";

export default function Home() {
  return (
    <main className={styles.main}>
      <h2>Lucille Hintz</h2>
      <div className={styles.questionContainer}>
        <Question question="Birthday" answer="January 26th, 1926" />
        <Question question="Favorite Color" answer="XXXX" />
        <Question question="Favorite Hobbey Growing Up" answer="XXXX" />
        <Question question="Favorite Food" answer="XXXX" />
        <Question question="Favorite Pet" answer="XXXX" />
        <Question question="Favorite Vacation" answer="XXXX" />
        <Question question="Birthplace" answer="XXXX" />
        <Question
          question="Where were you when Apollo 11 landed on the moon?"
          answer="XXXX"
        />
        <Question question="Where were you during 9/11?" answer="XXXX" />
        <Question question="Did you play any sports?" answer="XXXX" />
        <Question question="Favorite subject in school" answer="XXXX" />
        <Question
          question="How did you meet your husband Paul?"
          answer="XXXX"
        />
        <Question question="How old were you when you had Jim?" answer="XXXX" />
        <Question question="How did Paul ask you to marry him?" answer="XXXX" />
        <Question
          question="When and where did you get married?"
          answer="XXXX"
        />
        <Question question="Favorite job?" answer="XXXX" />
        <Question question="Favorite book?" answer="XXXX" />
        <Question question="Favorite holiday?" answer="XXXX" />
        <Question question="Favorite movie?" answer="XXXX" />
        <Question question="Favorite type of music?" answer="XXXX" />
        <Question question="Favorite tv show?" answer="XXXX" />
        <Question question="Where did you grow up?" answer="XXXX" />
        <Question question="Best Memory?" answer="XXXX" />
      </div>
    </main>
  );
}
