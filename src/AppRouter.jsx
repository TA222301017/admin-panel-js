import React, { useMemo, lazy, Suspense, forwardRef } from "react";
import {
  BrowserRouter as Router,
  Link as RouterLink,
  Routes,
  Route,
} from "react-router-dom";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";

export const LinkBehavior = forwardRef((props, ref) => {
  const theme = useTheme();
  const { href, ...other } = props;
  return (
    <RouterLink
      data-testid="custom-link"
      ref={ref}
      to={href || "/"}
      pathname={href || "/"}
      style={{ color: theme.palette.success }}
      {...other}
    />
  );
});

LinkBehavior.propTypes = {
  href: PropTypes.oneOfType([
    PropTypes.shape({
      hash: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string,
    }),
    PropTypes.string,
  ]).isRequired,
};

Router.propTypes = {
  children: PropTypes.node,
};

import LoaderCover from "./components/LoaderCover";
import { CssBaseline } from "@mui/material";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const AccessLogs = lazy(() => import("./pages/AccessLogs"));
const RSSILogs = lazy(() => import("./pages/RSSILogs"));
const AccessRule = lazy(() => import("./pages/AccessRule"));
const KeyPosition = lazy(() => import("./pages/KeyPosition"));
const Locks = lazy(() => import("./pages/Locks"));
const EditLock = lazy(() => import("./pages/EditLock"));
const Personels = lazy(() => import("./pages/Personels"));
const Login = lazy(() => import("./pages/Login"));
const AddPersonel = lazy(() => import("./pages/AddPersonel"));
const EditPersonel = lazy(() => import("./pages/EditPersonel"));
const AddKey = lazy(() => import("./pages/AddKey"));
const EditKey = lazy(() => import("./pages/EditKey"));
const Keys = lazy(() => import("./pages/Keys"));
const PositionGUI = lazy(() => import("./pages/PositionGUI"));
const Maps = lazy(() => import("./pages/Maps"));
const AddMap = lazy(() => import("./pages/AddMap"));
const EditMap = lazy(() => import("./pages/EditMap"));
const HealthcheckLogs = lazy(() => import("./pages/HealthcheckLogs"));

const AppRouter = () => {
  const mode = useSelector((state) => state.color.value);
  const theme = useMemo(
    () =>
      createTheme({
        components: {
          MuiLink: {
            defaultProps: {
              component: LinkBehavior,
            },
          },
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                scrollbarColor:
                  mode === "dark" ? "#6b6b6b #2b2b2b" : "#fefefe #f2f2f2",
                "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                  backgroundColor: mode === "dark" ? "#2b2b2b" : "#f2f2f2",
                },
                "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                  borderRadius: 8,
                  backgroundColor: mode === "dark" ? "#6b6b6b" : "#cbcbcb",
                  minHeight: 24,
                },
                "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
                  {
                    backgroundColor: "#959595",
                  },
                "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
                  {
                    backgroundColor: "#959595",
                  },
                "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
                  {
                    backgroundColor: "#959595",
                  },
                "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
                  backgroundColor: mode === "dark" ? "#2b2b2b" : "#f2f2f2",
                },
              },
            },
          },
        },
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<LoaderCover show={true} />}>
        <Router>
          <Routes>
            <Route path="/" exact element={<Login />} />

            <Route path="/dashboard" exact element={<Dashboard />} />

            <Route path="/access-rule" exact element={<AccessRule />} />
            <Route path="/access-log" exact element={<AccessLogs />} />
            <Route path="/position-log" exact element={<RSSILogs />} />
            <Route
              path="/healthcheck-log"
              exact
              element={<HealthcheckLogs />}
            />

            <Route path="/lock" exact element={<Locks />} />
            <Route path="/lock/edit/:lockId" exact element={<EditLock />} />

            <Route path="/personel" exact element={<Personels />} />
            <Route path="/personel/add" exact element={<AddPersonel />} />
            <Route
              path="/personel/edit/:personelId"
              element={<EditPersonel />}
            />

            <Route path="/key" exact element={<Keys />} />
            <Route path="/key/add" exact element={<AddKey />} />
            <Route path="/key/edit/:keyId" exact element={<EditKey />} />
            <Route path="/key/position" exact element={<KeyPosition />} />

            <Route path="/map" exact element={<Maps />} />
            <Route path="/map/add" exact element={<AddMap />} />
            <Route path="/map/edit/:mapId" exact element={<EditMap />} />
            <Route
              path="/map/positioning/:mapId"
              exact
              element={<PositionGUI />}
            />
          </Routes>
        </Router>
      </Suspense>
    </ThemeProvider>
    // <div>
    //   <div className="border">
    //     <Dashboard />
    //     {/* <NavigationBar name="Muhamad Taruna" /> */}
    //   </div>
    // </div>
  );
};

export default AppRouter;
