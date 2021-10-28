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
import { useEffect } from "react";

const Header = ({ index }) => {
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

  const hoverStyle = {
    transition: "all 2s",
    "&:hover a": {
      textDecoration: "underline",
      textUnderlineOffset: "0.4em",
    },
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
      color={index && "transparent"}
    >
      <Container
        maxWidth="lg"
        sx={{ marginTop: "0.2rem", marginBottom: "0.25rem" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: "white",
            }}
          >
            <Link href="/">
              <a
                style={{
                  border: "2px solid white",
                  borderRadius: 3,
                  padding: 4,
                }}
              >
                HH
              </a>
            </Link>
          </Typography>
          <div>
            <List sx={{ display: "flex", color: "white", fontWeight: "bold" }}>
              <ListItem sx={hoverStyle}>
                <Link href="/#">
                  <a>Home</a>
                </Link>
              </ListItem>
              <ListItem sx={hoverStyle}>
                <Link href="/#about">
                  <a>About</a>
                </Link>
              </ListItem>
              <ListItem sx={hoverStyle}>
                <Link href="/rooms">
                  <a>Rooms</a>
                </Link>
              </ListItem>
              {!isAuthenticated ? (
                menuItems.map((item) => (
                  <ListItem key={item.text} sx={hoverStyle}>
                    <Link href={item.path}>
                      <a>{item.text}</a>
                    </Link>
                  </ListItem>
                ))
              ) : (
                <ListItem sx={hoverStyle}>
                  <Link href="#">
                    <a style={{ cursor: "pointer" }} onClick={SignOut}>
                      SignOut
                    </a>
                  </Link>
                </ListItem>
              )}
              {isAdmin ? (
                <ListItem sx={hoverStyle}>
                  <Link href="/admin">
                    <a>Admin</a>
                  </Link>
                </ListItem>
              ) : null}
              {user ? (
                <ListItem sx={hoverStyle}>
                  <Link href="/profile">
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
