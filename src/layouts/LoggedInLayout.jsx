import * as React from "react";
import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

import {
  DashboardSharp,
  AccessTimeSharp,
  HealthAndSafetySharp,
  LockSharp,
  KeySharp,
  PersonSharp,
} from "@mui/icons-material";
const drawerWidth = 240;

const navItems = [
  {
    icon: <DashboardSharp />,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <AccessTimeSharp />,
    name: "Access Log",
    path: "/access-log",
  },
  {
    icon: <HealthAndSafetySharp />,
    name: "Healthcheck Logs",
    path: "/healthcheck-log",
  },
  {
    icon: <LockSharp />,
    name: "Lock List",
    path: "/lock",
  },
  {
    icon: <PersonSharp />,
    name: "Personel List",
    path: "/personel",
  },
  {
    icon: <KeySharp />,
    name: "Keys List",
    path: "/key",
  },
  {
    icon: <LogoutIcon />,
    name: "Log Out",
    path: "/#",
  },
];

const LoggedInLayout = ({ children, title, breadcrumbs, desc }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
        color="primary"
      >
        <Toolbar>
          <Typography variant="h5">TA222301017</Typography>
        </Toolbar>
        <List>
          {navItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => navigate(item.path)}
                selected={location.pathname.startsWith(item.path)}
                disableRipple
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 5 }}
      >
        <Typography variant="h3">{title}</Typography>
        <Typography variant="h7">{desc}</Typography>
        <br />
        <br />
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs &&
            breadcrumbs.map((e, i) => (
              <Link underline="hover" key={i} onClick={() => navigate(e.path)}>
                {e.name}
              </Link>
            ))}
        </Breadcrumbs>
        {children}
      </Box>
    </Box>
  );
};

export default LoggedInLayout;
