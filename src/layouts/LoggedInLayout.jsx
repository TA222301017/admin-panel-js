import * as React from "react";
import { Box, IconButton } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import {
  DashboardSharp,
  AccessTimeSharp,
  HealthAndSafetySharp,
  LockSharp,
  KeySharp,
  PersonSharp,
  Brightness7Sharp,
  Brightness4Sharp,
  RuleSharp,
  LocationOnSharp,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../store/reducers/userSlice";
import { toastClose } from "../store/reducers/toastSlice";
import { toggleColor } from "../store/reducers/colorSlice";
const drawerWidth = 240;

const navItems = [
  {
    icon: <DashboardSharp />,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <RuleSharp />,
    name: "Access Rule",
    path: "/access-rule",
  },
  {
    icon: <LocationOnSharp />,
    name: "Position Log",
    path: "/position-log",
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
];

const LoggedInLayout = ({ children, title, breadcrumbs, desc }) => {
  const toast = useSelector((state) => state.toast);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const color = useSelector((state) => state.color.value);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
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
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                localStorage.removeItem("token");
                dispatch(clearUser());
                navigate("/");
              }}
              disableRipple
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"Log Out"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 5 }}
      >
        <IconButton
          onClick={() => {
            console.log(color);
            dispatch(toggleColor());
          }}
          color="inherit"
          style={{ float: "right" }}
          size="large"
        >
          {color === "dark" ? (
            <Brightness7Sharp fontSize="inherit" />
          ) : (
            <Brightness4Sharp fontSize="inherit" />
          )}
        </IconButton>
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={5000}
        onClose={() => dispatch(toastClose())}
        open={toast.show}
        key="topcenter"
      >
        <Alert
          severity={toast.variant}
          sx={{ width: "100%" }}
          onClose={() => dispatch(toastClose())}
        >
          {toast.value}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoggedInLayout;
