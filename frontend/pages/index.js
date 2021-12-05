import Head from "next/head";
import styles from "../styles/Home.module.sass";
import { BiHeart } from "react-icons/bi";
import Shortener from "../src/shortener";
import Navigation from "../src/navigation";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PYGMY : URL Shortener</title>
        <meta name="description" content="URL shortener using MERN stack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Navigation />
      </header>
      <main className={styles.main}>
        <Shortener />
      </main>

      <footer className={styles.footer}>
        <p>
          Made with <BiHeart /> by
          <a
            href="https://www.linkedin.com/in/muhammed-ahad-ba625986/"
            target="_blank"
            rel="noreferrer"
          >
            Muhammed Ahad
          </a>
        </p>
      </footer>
    </div>
  );
}
