import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <PuffLoader />;
    </div>
  );
};

export default Loader;
