import * as React from "react";
import {
  Box,
  Divider,
  IconButton,
  Paper,
  SpeedDialIcon,
  useTheme,
} from "@mui/material";
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
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
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
            viewBox="0 0 240.51 311.07"
            style={{ width: 30, height: 30 }}
          >
            <defs>
              <style>
                .cls-1{`{fill:${color === "dark" ? "#fff" : "#000"};}`}
              </style>
            </defs>
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <path
                  class="cls-1"
                  d="M208.18,109.28h-1.7v-23A86.23,86.23,0,0,0,120.25,0h0A86.23,86.23,0,0,0,34,86.23v23H32.33A32.32,32.32,0,0,0,0,141.6V278.74a32.32,32.32,0,0,0,32.33,32.33H208.18a32.33,32.33,0,0,0,32.33-32.33V141.6A32.33,32.33,0,0,0,208.18,109.28Zm-56.77,28.33a5.63,5.63,0,0,0-2.86,5.47c.08,35.72,0,71.44.09,107.17a6.6,6.6,0,0,1-2,5.32c-6,5.76-11.75,11.75-17.72,17.52-3.43,3.32-5.55,3.45-8.81.24-8-7.91-15.9-16-24.18-24.38l14.34-13.5L95.65,221.71l14.06-13.85L95.86,194.71c5-4.88,9.56-9.33,14.34-14-1.14-1.19-2-2.06-2.8-2.9-4.7-4.71-9.45-9.37-14.06-14.17a5.45,5.45,0,0,1-1.42-3.35q-.19-9.31,0-18.65a3.63,3.63,0,0,0-2-3.59,54.38,54.38,0,0,1-23.2-28.47C61.7,95.59,62,81.61,68,68c7.74-17.31,21-28.47,39.44-32.57,21.36-4.74,39.93,1.06,55,17.08a52.81,52.81,0,0,1,14.75,39.41C176.56,111.43,167.87,126.86,151.41,137.61Z"
                />
                <path
                  class="cls-1"
                  d="M120.31,56.23a9.42,9.42,0,0,0-9.17,9.47A9.53,9.53,0,0,0,120.5,75c5.23,0,9.85-4.36,9.62-9.43C129.88,60.2,126.15,56.22,120.31,56.23Z"
                />
              </g>
            </g>
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
        <Paper>
          <SpeedDial
            style={{ position: "absolute", right: 30 }}
            ariaLabel="Settings"
            icon={<SpeedDialIcon icon={<SettingsSharp />} />}
            direction="left"
            FabProps={{
              sx: {
                color: "inherit",
              },
              disableFocusRipple: true,
              disableRipple: true,
              style: {
                backgroundColor: color === "dark" ? "#2b2b2b" : "#fafafa",
              },
            }}
          >
            <SpeedDialAction
              // tooltipOpen
              icon={
                color === "light" ? <Brightness7Sharp /> : <Brightness4Sharp />
              }
              tooltipTitle={`${color === "light" ? "Dark" : "Light"} Mode`}
              onClick={() => {
                dispatch(toggleColor());
              }}
            />
            <SpeedDialAction
              // tooltipOpen
              tooltipTitle={"Logout"}
              icon={<LogoutIcon />}
              onClick={() => {
                localStorage.removeItem("token");
                dispatch(clearUser());
                navigate("/");
              }}
            />
          </SpeedDial>
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
