import styles from "../../styles/components/button.module.css";

type ButtonType = {
  content: string;
};

const Button = (props: ButtonType) => {
  return (
    <div className={styles.button}>
      <p>{props.content}</p>
    </div>
  );
};

export default Button;
