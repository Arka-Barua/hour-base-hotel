import { Toolbar } from "@mui/material";
import Header from "./Header";

const UserLayout = ({ children, index }) => {
  return (
    <>
      <Header index={index} />
      <Toolbar />
      <div>{children}</div>
    </>
  );
};

export default UserLayout;
