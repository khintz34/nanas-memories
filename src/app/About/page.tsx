import Image from "next/image";
import styles from "./page.module.scss";
import Question from "@/components/Question/Question";

export default function Home() {
  return (
    <main className={styles.main}>
      <h2>Lucille Hintz</h2>
      <div className={styles.questionContainer}>
        <Question question="Birthday" answer="January 26th, 1926" />
        <Question question="Favorite Color" answer="Blue" />
        <Question
          question="Favorite Hobby Growing Up"
          answer="Sewing and knitting mittens"
        />
        <Question
          question="Favorite Pet"
          answer="Smokey - Lhasa Apso. Mack - Black lab mix found under the house overhand"
        />
        <Question
          question="Favorite Vacation"
          answer="Hawaii trip with Sandy. Went to Ohahu and Maui and did the Road to Hana. "
        />
        <Question
          question="Birthplace"
          answer="Milwaukee. Born at her parent's house. "
        />
        <Question
          question="Where were you when Apollo 11 landed on the moon?"
          answer="Watching with the whole family at the house on 83rd."
        />
        <Question
          question="Where were you during 9/11?"
          answer="On a tour with a church group to see a robot. There is some speculation they have been gambling though... "
        />
        <Question question="Did you play any sports?" answer="Nope" />
        <Question
          question="Favorite subject in school"
          answer="Nana doesnt remember her favorite but she did not like typing."
        />
        <Question
          question="How did you meet your husband Paul?"
          answer="Met at The Journal after the war. Later merged with The Sentinal to become The Journal Sentinal."
        />
        <Question
          question="How old were you when you had Jim?"
          answer="Nana was 29. They tried to get pregnant for awhile"
        />
        <Question
          question="How did Paul ask you to marry him?"
          answer="Paul and Nana went on a walk downtown and stopped at a jeweler. Nana liked out a small diamon ring. Paul went back the next day and got it then went to Nana's parents house to meet Nana there. He didnt go down on one knee but gave her the ring. Nana remembers she wasnt at work that day because she got something in her eye. She also remembers her work friend Mary noticing the ring next day at work."
        />
        <Question
          question="When and where did you get married?"
          answer="June 5, 1948. Got married at a little wodden Lutheran church in Milkwaukee they belonged too. There was a big picture of Jesus in the background. Nana's dad drove the rent-a-car after the wedding and they went to Keller for the reception dinner."
        />
        <Question question="Favorite job?" answer="Raising her family" />
        <Question
          question="Favorite book?"
          answer="Americana series by Janet Dailey. A romance series with each book taking place in a different state."
        />
        <Question
          question="Favorite holiday?"
          answer="Christmas. She remembers decorting the tree with her family and her sister and her switching off hosting. "
        />
        <Question question="Favorite movie?" answer="Sound of Music" />
        <Question
          question="Favorite type of music?"
          answer="Marching bands. She like John Paul Susa. Jim played trambone in a marching band."
        />
        <Question
          question="Favorite tv show?"
          answer="The original Star Trek. She made the kids go to bed early so she could watch by herself. "
        />
        <Question
          question="Where did you grow up?"
          answer="27th St in Milwaukee. Her grandparents lived across the alley on 28th. That was just went she was young. They built a red brick house on 70th/Locust where she lived until she got married at 22."
        />
        <Question
          question="Best Memory?"
          answer="Watching the kids grow up, going camping, being with all the other fmailies in the neigherbood. Almost every house on the block and a house full of kids."
        />
        <Question
          question="Did you play instruments?"
          answer="Viola in the Junior All-City Band. This was before her appendix burst and was in the hospital for 5 weeks. Only 1 of 5 patients survived that back then."
        />
        <Question
          question="Have you met anyone famous?"
          answer="Riba McEntire. She went to Broadway with friends who all were big fans. They flew to New Jersey then took a bus over. On her bus seet was a meet and greet ticket. She was able to bring one of the other girls with her. They spend the evening around Broadway and seeing Statue of Liberty. This was in the late 90s."
        />
        <Question
          question="Fun Memory?"
          answer="Went on three cruises. Went to Cancun with Sandy during a peasant revolt due to poor wages. They went snorkeling too."
        />
      </div>
    </main>
  );
}
