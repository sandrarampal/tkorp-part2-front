import { type } from "os";

type ButtonType = {
  content: string;
};

const Button = (props: ButtonType) => {
  return (
    <div>
      <button>{props.content}</button>
    </div>
  );
};

export default Button;
