import Link from "next/link";
import {
  AppBar,
  Container,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";

const Header = () => {
  const {
    setIsAuthenticated,
    isAuthenticated,
    isAdmin,
    user,
    setUser,
    setIsAdmin,
    setIsLoaded,
    isLoaded,
  } = useAuthContext();

  useEffect(() => {
    if (isLoaded && isAuthenticated) setIsAuthenticated(true);
  }, [isAuthenticated, isLoaded]);

  const SignOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      setUser(null);
      setIsAdmin(false);
      setIsAuthenticated(false);
      setIsLoaded(true);
    }
  };

  const menuItems = [
    {
      text: "SignIn",
      path: "/signin",
    },
    {
      text: "SignUp",
      path: "/signup",
    },
  ];

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">HH</Link>
          </Typography>
          <div>
            <List sx={{ display: "flex" }}>
              <ListItem>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </ListItem>
              <ListItem>
                <Link href="#">
                  <a>About</a>
                </Link>
              </ListItem>
              <ListItem>
                <Link href="#">
                  <a>Room</a>
                </Link>
              </ListItem>
              {!isAuthenticated ? (
                menuItems.map((item) => (
                  <ListItem key={item.text}>
                    <Link href={item.path}>
                      <a>{item.text}</a>
                    </Link>
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <Link href="#">
                    <a style={{ cursor: "pointer" }} onClick={SignOut}>
                      SignOut
                    </a>
                  </Link>
                </ListItem>
              )}
              {isAdmin ? (
                <ListItem>
                  <Link href="/admin">
                    <a>Admin</a>
                  </Link>
                </ListItem>
              ) : null}
              {user ? (
                <ListItem>
                  <Link href="#">
                    <a>{user.firstname}</a>
                  </Link>
                </ListItem>
              ) : (
                ""
              )}
            </List>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
