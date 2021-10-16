import { useRouter } from "next/router";
import { useEffect } from "react";
import Loading from "../components/loading";
import { useAuthContext } from "../context/AuthContext";

const withAdmin = (WrappedComponent) => {
  return (props) => {
    const { isAdmin, isAuthenticated, isLoaded } = useAuthContext();
    const router = useRouter();
    useEffect(() => {
      if (isLoaded && !isAdmin) {
        console.log("admin redirect");
        router.replace("/");
      }
    }, [isLoaded, isAuthenticated, isAdmin]);
    if (isLoaded && !isAdmin) return <Loading />;

    return <WrappedComponent {...props} />;
  };
};

export default withAdmin;
