import { Toolbar } from "@mui/material";
import Header from "./Header";

const UserLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Toolbar />
      <div className="userLayout">{children}</div>
    </>
  );
};

export default UserLayout;
