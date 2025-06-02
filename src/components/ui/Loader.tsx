import { PuffLoader } from "react-spinners";
import styles from "../../styles/components/loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <PuffLoader />
    </div>
  );
};

export default Loader;
