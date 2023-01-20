import BarChartIcon from "@mui/icons-material/BarChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import KeyIcon from "@mui/icons-material/Key";

// Dashboard component
const Dashboard = () => {
  const navigate = useNavigate();

  function dashboard() {
    console.log("dashboard clicked");
  }

  return (
    <ListItemButton onClick={dashboard}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
  );
};

// Access Logs component
const AccessLogs = () => {
  const navigate = useNavigate();

  function accessLogs() {
    console.log("Access Logs clicked");
  }

  return (
    <ListItemButton onClick={accessLogs}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Access Logs" />
    </ListItemButton>
  );
};

// Healtcheck Logs component
const HealthcheckLogs = () => {
  const navigate = useNavigate();

  function healthcheckLogs() {
    console.log("Healthcheck Logs clicked");
  }

  return (
    <ListItemButton onClick={healthcheckLogs}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Healthcheck Logs" />
    </ListItemButton>
  );
};

// Lock List component
const LocksList = () => {
  const navigate = useNavigate();

  function locksList() {
    console.log("Locks List clicked");
  }

  return (
    <ListItemButton onClick={locksList}>
      <ListItemIcon>
        <LockIcon />
      </ListItemIcon>
      <ListItemText primary="Locks List" />
    </ListItemButton>
  );
};

// Personal List component
const PersonalList = () => {
  const navigate = useNavigate();

  function personalList() {
    console.log("Personal List clicked");
  }

  return (
    <ListItemButton onClick={personalList}>
      <ListItemIcon>
        <AccessibilityIcon />
      </ListItemIcon>
      <ListItemText primary="Personal List" />
    </ListItemButton>
  );
};

// Key List component
const KeysList = () => {
  const navigate = useNavigate();

  function keysList() {
    console.log("Keys List clicked");
  }

  return (
    <ListItemButton onClick={keysList}>
      <ListItemIcon>
        <KeyIcon />
      </ListItemIcon>
      <ListItemText primary="Keys List" />
    </ListItemButton>
  );
};

// Log Out component
const LogOut = () => {
  const navigate = useNavigate();

  function logOut() {
    localStorage.clear();
    navigate("/SignIn");
  }

  return (
    <ListItemButton onClick={logOut}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItemButton>
  );
};

export const listItems = (
  <React.Fragment>
    {/* rendering component button dashboard */}
    <Dashboard />

    {/* rendering component access logs dashboard */}
    <AccessLogs />

    {/* rendering component healthcheck logs dashboard */}
    <HealthcheckLogs />

    {/* rendering component locks list dashboard */}
    <LocksList />

    {/* rendering component personal list dashboard */}
    <PersonalList />

    {/* rendering component keys list dashboard */}
    <KeysList />

    {/* rendering component log out button */}
    <LogOut />
  </React.Fragment>
);
