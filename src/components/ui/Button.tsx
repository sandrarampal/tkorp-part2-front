type ButtonType = {
  content: string;
};

const Button = (props: ButtonType) => {
  return (
    <div>
      <p>{props.content}</p>
    </div>
  );
};

export default Button;
