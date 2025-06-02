import styles from "../src/styles/pages/home.module.css";
import Button from "components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/images/logo.png";

export default function Home() {
  return (
    <div className={`${styles.homePage} container`}>
      <div className={styles.welcomeSection}>
        <h1>Welcome</h1>
        <Image
          src={logo}
          alt="logo of the association"
          width={150}
          height={150}
          className={styles.logo}
        />
        <p className={styles.description}>
          Find the list of our marvelous members and their adorable companions
          here:
        </p>
      </div>
      <div className={styles.buttons}>
        <Link href="/animals" style={{ textDecoration: "none" }}>
          <Button content="Animals" />
        </Link>
        <Link href="/owners" style={{ textDecoration: "none" }}>
          <Button content="Owners" />
        </Link>
      </div>
    </div>
  );
}
