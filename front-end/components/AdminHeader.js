import Link from "next/link";
import {
  AppBar,
  Container,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";

const AdminHeader = () => {
  const menuItems = [
    {
      text: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      text: "Orders",
      path: "/admin/orders",
    },
    {
      text: "Rooms",
      path: "/admin/rooms",
    },
    {
      text: "SignIn",
      path: "/signin",
    },
    {
      text: "SignUp",
      path: "/signup",
    },
    {
      text: "HomePage",
      path: "/",
    },
  ];
  return (
    <AppBar
      position="fixed"
      elevation="false"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="#">HH</Link>
          </Typography>
          <div>
            <List sx={{ display: "flex" }}>
              {menuItems.map((item) => (
                <ListItem>
                  <Link href={item.path}>
                    <a>{item.text}</a>
                  </Link>
                </ListItem>
              ))}
            </List>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AdminHeader;
