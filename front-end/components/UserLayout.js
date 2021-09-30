import Header from "./Header";

const UserLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="userLayout">{children}</div>
    </>
  );
};

export default UserLayout;
