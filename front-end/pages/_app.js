import AdminLayout from "../components/AdminLayout";
import SignLayout from "../components/SignLayout";
import UserLayout from "../components/UserLayout";
import "../styles/globals.css";
const layouts = {
  admin: AdminLayout,
  user: UserLayout,
  sign: SignLayout,
};

const MyApp = ({ Component, pageProps }) => {
  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
