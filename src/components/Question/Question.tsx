import styles from "./Question.module.scss";

interface QandA {
  question: string;
  answer: string;
}

export default function Question({ question, answer }: QandA) {
  return (
    <div className={styles.qContainer}>
      <p className={styles.question}>{question}</p>
      <p className={styles.answer}>{answer}</p>
    </div>
  );
}
