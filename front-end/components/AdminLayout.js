import Link from "next/link";
import { useRouter } from "next/router";
import { Drawer, List, ListItem, Toolbar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AdminHeader from "./AdminHeader";
import { Box } from "@mui/system";

const drawerWidth = 200;

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  active: {
    background: "#f4f4f4",
    fontWeight: "bold",
  },
});

const AdminLayout = ({ children }) => {
  const classes = useStyles();
  const router = useRouter();
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
  ];
  return (
    <Box className={classes.root}>
      <AdminHeader />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                className={
                  router.pathname === item.path ? classes.active : null
                }
              >
                <Link href={item.path}>
                  <a style={{ width: "200px" }}>{item.text}</a>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      {/* <div className={classes.page}>{children}</div> */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
