import Link from "next/link";
import { useRouter } from "next/router";
import { Drawer, List, ListItem, ListItemIcon, Toolbar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Header from "./Header";
import { Box } from "@mui/system";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";

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
      path: "/admin",
      icon: <DashboardIcon />,
    },
    {
      text: "Orders",
      path: "/admin/orders",
      icon: <AssignmentIcon />,
    },
    {
      text: "Users",
      path: "/admin/users",
      icon: <PeopleIcon />,
    },
    {
      text: "Categories",
      path: "/admin/categories",
      icon: <CategoryIcon />,
    },
    {
      text: "Rooms",
      path: "/admin/rooms",
      icon: <BedroomParentIcon />,
    },
  ];
  return (
    <Box className={classes.root}>
      <Header />
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
                <ListItemIcon>{item.icon}</ListItemIcon>
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
