import styles from "../src/styles/pages/home.module.css";
import Button from "components/ui/Button";

import Link from "next/link";

export default function Home() {
  return (
    <div className={`${styles.homePage} container`}>
      <div>
        <h2>Welcome</h2>
        <p>
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
