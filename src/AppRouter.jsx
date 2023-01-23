import React, { useMemo, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";

import LoaderCover from "./components/LoaderCover";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const AccessLogs = lazy(() => import("./pages/AccessLogs"));
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
const HealthcheckLogs = lazy(() => import("./pages/HealthcheckLogs"));

const AppRouter = () => {
  const mode = useSelector((state) => state.color.value);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Suspense fallback={<LoaderCover show={true} />}>
          <Routes>
            <Route path="/" exact element={<Login />} />
          </Routes>

          <Routes>
            <Route path="/dashboard" exact element={<Dashboard />} />

            <Route path="/access-rule" exact element={<AccessRule />} />
            <Route path="/access-log" exact element={<AccessLogs />} />
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
          </Routes>
        </Suspense>
      </Router>
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
