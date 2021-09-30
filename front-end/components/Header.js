import Link from "next/link";
import {
  AppBar,
  Container,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static" elevation="false">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="#">HH</Link>
          </Typography>
          <div>
            <List sx={{ display: "flex" }}>
              <ListItem>
                <Link href="#">
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
              <ListItem>
                <Link href="#">
                  <a>SignUp</a>
                </Link>
              </ListItem>
              <ListItem>
                <Link href="#">
                  <a>SignIn</a>
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/admin/dashboard">
                  <a>Admin</a>
                </Link>
              </ListItem>
            </List>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
