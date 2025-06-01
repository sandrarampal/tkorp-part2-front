import styles from "../../styles/components/listcard.module.css";

type ListCardType = {
  name: string;
  species?: string;
};

const ListCard = (props: ListCardType) => {
  return (
    <div className={styles.cardBorder}>
      <h2>{props.name}</h2>
      {props.species && <p>{props.species}</p>}
    </div>
  );
};

export default ListCard;
