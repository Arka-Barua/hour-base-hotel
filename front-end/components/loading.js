import Image from "next/image";

import loading from "../styles/loading.svg";
const Loading = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#212121",
        display: "grid",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Image src={loading} />
    </div>
  );
};

export default Loading;
