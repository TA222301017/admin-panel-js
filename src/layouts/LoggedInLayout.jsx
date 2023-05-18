import * as React from "react";
import { Box, IconButton, Paper } from "@mui/material";
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
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
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
  MapSharp,
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
    name: "Peraturan Akses",
    path: "/access-rule",
  },
  {
    icon: <LockSharp />,
    name: "Kelola Lock",
    path: "/lock",
  },
  {
    icon: <PersonSharp />,
    name: "Kelola Personel",
    path: "/personel",
  },
  {
    icon: <KeySharp />,
    name: "Kelola Key",
    path: "/key",
  },
  {
    icon: <MapSharp />,
    name: "Kelola Denah",
    path: "/map",
  },
  {
    icon: <LocationOnSharp />,
    name: "Log Posisi",
    path: "/position-log",
  },
  {
    icon: <AccessTimeSharp />,
    name: "Log Akses",
    path: "/access-log",
  },
  {
    icon: <HealthAndSafetySharp />,
    name: "Log Healthcheck",
    path: "/healthcheck-log",
  },
];

const LoggedInLayout = ({ children, title, breadcrumbs, desc }) => {
  const toast = useSelector((state) => state.toast);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const color = useSelector((state) => state.color.value);

  return (
    <Box sx={{ display: "flex" }} style={{ minHeight: "100vh" }}>
      <CssBaseline />
      <Drawer
        PaperProps={{
          elevation: 3,
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            backgroundColor: "",
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        style={{ backgroundColor: "rgb(0, 0, 0, 0)" }}
        variant="permanent"
        anchor="left"
        color="primary"
      >
        <Toolbar>
          <Typography variant="h5" fontWeight="semibold">
            BlueGuard
          </Typography>
        </Toolbar>
        <List>
          {navItems.map((item, index) => (
            <ListItemButton
              component={RouterLink}
              key={index}
              to={item.path}
              selected={location.pathname.startsWith(item.path)}
              disablePadding
              disableRipple
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
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
        sx={{
          flexGrow: 1,
          bgcolor: color === "dark" ? "background.default" : "#fafafa",
          p: 5,
        }}
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
        <Typography variant="h4">{title}</Typography>
        <Typography variant="h7">{desc}</Typography>
        <br />
        <br />
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs &&
            breadcrumbs.map((e, i) => (
              <Link underline="hover" key={i} href={e.path}>
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
