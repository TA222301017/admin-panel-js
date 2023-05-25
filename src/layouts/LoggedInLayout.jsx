import * as React from "react";
import { Box, Divider, IconButton, Paper, useTheme } from "@mui/material";
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
  HomeSharp,
  SettingsSharp,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../store/reducers/userSlice";
import { toastClose } from "../store/reducers/toastSlice";
import { toggleColor } from "../store/reducers/colorSlice";

const drawerWidth = 220;
const navItems = [
  {
    dense: true,
    icon: <DashboardSharp />,
    titleIcon: <DashboardSharp style={{ fontSize: "inherit" }} />,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    dense: false,
    icon: null,
    titleIcon: null,
    name: "Kelola Data",
    path: "blank",
  },
  {
    dense: true,
    icon: <RuleSharp />,
    titleIcon: <RuleSharp style={{ fontSize: "inherit" }} />,
    name: "Peraturan Akses",
    path: "/access-rule",
  },
  {
    dense: true,
    icon: <LockSharp />,
    titleIcon: <LockSharp style={{ fontSize: "inherit" }} />,
    name: "Kelola Lock",
    path: "/lock",
  },
  {
    dense: true,
    icon: <PersonSharp />,
    titleIcon: <PersonSharp style={{ fontSize: "inherit" }} />,
    name: "Kelola Personel",
    path: "/personel",
  },
  {
    dense: true,
    icon: <KeySharp />,
    titleIcon: <KeySharp style={{ fontSize: "inherit" }} />,
    name: "Kelola Key",
    path: "/key",
  },
  {
    dense: true,
    icon: <MapSharp />,
    titleIcon: <MapSharp style={{ fontSize: "inherit" }} />,
    name: "Kelola Denah",
    path: "/map",
  },
  {
    dense: false,
    icon: null,
    titleIcon: null,
    name: "Telusuri Log",
    path: "blank",
  },
  {
    dense: true,
    icon: <LocationOnSharp />,
    titleIcon: <LocationOnSharp style={{ fontSize: "inherit" }} />,
    name: "Log Posisi",
    path: "/position-log",
  },
  {
    dense: true,
    icon: <AccessTimeSharp />,
    titleIcon: <AccessTimeSharp style={{ fontSize: "inherit" }} />,
    name: "Log Akses",
    path: "/access-log",
  },
  {
    dense: true,
    icon: <HealthAndSafetySharp />,
    titleIcon: <HealthAndSafetySharp style={{ fontSize: "inherit" }} />,
    name: "Log Healthcheck",
    path: "/healthcheck-log",
  },
];

const LoggedInLayout = ({ children, title, breadcrumbs, desc }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();

  const toast = useSelector((state) => state.toast);
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
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "primary",
          },
        }}
        variant="permanent"
        anchor="left"
        color="primary"
      >
        <Toolbar style={{ float: "bottom" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="40"
            viewBox="0 0 180 270"
            version="1.1"
            rotate="90"
          >
            <path
              d="M 24 68.964 L 24 116.950 40.250 117.225 L 56.500 117.500 56.756 194.665 L 57.012 271.830 63.474 272.165 C 67.028 272.349, 74.450 272.358, 79.968 272.184 L 90 271.867 90 264.951 L 90 258.035 114.750 257.767 L 139.500 257.500 139.500 234.500 L 139.500 211.500 125.250 211.223 L 111 210.945 111 218.473 L 111 226 100.500 226 L 90 226 90 206 C 90 190.703, 90.294 185.984, 91.250 185.932 C 91.938 185.895, 102.480 185.893, 114.678 185.928 C 126.876 185.964, 137.563 185.721, 138.428 185.389 C 139.794 184.865, 140 181.786, 140 161.893 C 140 140.805, 139.862 138.990, 138.250 138.872 C 135.296 138.657, 128.907 138.640, 119.750 138.824 L 111 139 111 146.500 L 111 154 100.500 154 L 90 154 90 135.500 L 90 117 99.010 117 L 108.019 117 107.760 69.250 L 107.500 21.500 65.750 21.239 L 24 20.978 24 68.964 M 51.558 50.775 C 51.251 51.082, 51 59.583, 51 69.667 L 51 88 66.022 88 L 81.044 88 80.772 69.250 L 80.500 50.500 66.308 50.358 C 58.503 50.280, 51.866 50.468, 51.558 50.775 M 101.492 130.250 C 101.248 130.938, 100.924 134.425, 100.774 138 L 100.500 144.500 96.750 144.810 C 93.337 145.093, 93 145.385, 93 148.060 L 93 151 100.500 151 L 108 151 108 143.534 L 108 136.068 118.750 135.784 L 129.500 135.500 129.813 132.250 L 130.127 129 116.032 129 C 105.660 129, 101.820 129.330, 101.492 130.250 M 101 209.500 L 101 217 97 217 C 93.086 217, 93 217.076, 93 220.544 L 93 224.088 100.250 223.794 L 107.500 223.500 107.792 215.750 L 108.084 208 119.042 208 L 130 208 130 205 L 130 202 115.500 202 L 101 202 101 209.500"
              stroke="none"
              fill={color === "dark" ? "#fff" : "#000"}
              fill-rule="evenodd"
            />
          </svg>

          <Typography variant="h5" fontWeight="bold">
            BlueGuard
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {navItems.map((item, index) => (
            <ListItem disablePadding>
              {item.dense ? (
                <ListItemButton
                  component={RouterLink}
                  key={index}
                  to={item.path}
                  selected={location.pathname.startsWith(item.path)}
                  TouchRippleProps={{
                    color: "success.main",
                  }}
                  focusRipple
                  dense={item.dense}
                  disableRipple
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              ) : (
                <>
                  <ListItem disableRipple>
                    <ListItemText
                      primary={item.name}
                      style={{ marginTop: "12px" }}
                      // primaryTypographyProps={{
                      //   mt: "12px",
                      // }}
                    />
                  </ListItem>
                </>
              )}
            </ListItem>
          ))}
          <ListItem disablePadding style={{ marginTop: "12px" }}>
            <ListItemButton
              onClick={() => {
                localStorage.removeItem("token");
                dispatch(clearUser());
                navigate("/");
              }}
              disableRipple
              dense
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
        <Paper elevation={3} style={{ float: "right", borderRadius: "50%" }}>
          <IconButton
            onClick={() => {
              dispatch(toggleColor());
            }}
            color={theme.palette.text.primary}
            size="large"
          >
            <SettingsSharp fontSize="inherit" />
          </IconButton>
        </Paper>
        <Typography
          variant="h4"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {
            navItems.filter((e) => location.pathname.includes(e.path))[0]
              .titleIcon
          }
          <span>{title}</span>
        </Typography>
        <Typography variant="h7">{desc}</Typography>
        <br />
        <br />
        <Breadcrumbs
          separator="›"
          aria-label="breadcrumb"
          // style={{ color: theme.palette.primary.main }}
        >
          {breadcrumbs &&
            breadcrumbs.map((e, i) => (
              <Link
                underline="hover"
                key={i}
                href={e.path}
                color={
                  location.pathname.endsWith(e.path)
                    ? theme.palette.text.primary
                    : "inherit"
                }
              >
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
