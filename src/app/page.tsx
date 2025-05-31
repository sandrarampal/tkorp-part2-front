import styles from "./page.module.css";
import Button from "../components/ui/Button";
import Header from "components/shared/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <div>
        <p>
          Find the list of our marvelous members and their adorable companions
          here:
        </p>
        <div>
          <Button content="Animals" />
          <Button content="Owners" />
        </div>
      </div>
    </div>
  );
}
