import styles from "./page.module.css";
import Button from "../components/ui/Button";

import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>
        <p>
          Find the list of our marvelous members and their adorable companions
          here:
        </p>
        <div>
          <Link href="/animals">
            <Button content="Animals" />
          </Link>
          <Link href="/owners">
            <Button content="Owners" />
          </Link>
        </div>
      </div>
    </div>
  );
}
