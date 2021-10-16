// HOC/withAuth.jsx
import { useRouter } from "next/router";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useAuthContext } from "../context/AuthContext";
import Loading from "../components/loading";

const withAuth = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    const router = useRouter();
    const { isLoaded, isAuthenticated, user, setIsLoaded } = useAuthContext();

    useEffect(() => {
      if (isLoaded && !isAuthenticated) {
        console.log("auth redirect");
        setIsLoaded(true);
        router.replace("/");
      }
    }, [isLoaded, isAuthenticated, user]);

    if (!isLoaded) return <Loading />;
    // If this is an accessToken we just render the component that was passed with all its props

    return isLoaded && <WrappedComponent {...props} />;
  };
};

export default withAuth;
