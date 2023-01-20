import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AccessLogs from "./pages/AccessLogs";
import KeyPosition from "./pages/KeyPosition";
import Locks from "./pages/Locks";
import EditLock from "./pages/EditLock";
import Personels from "./pages/Personels";
import Login from "./pages/Login";
import AddPersonel from "./pages/AddPersonel";
import EditPersonel from "./pages/EditPersonel";
import AddKey from "./pages/AddKey";
import EditKey from "./pages/EditKey";
import Keys from "./pages/Keys";
import HealthcheckLogs from "./pages/HealthcheckLogs";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />

        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/access-log" exact element={<AccessLogs />} />
        <Route path="/healthcheck-log" exact element={<HealthcheckLogs />} />

        <Route path="/lock" exact element={<Locks />} />
        <Route path="/lock/edit/:lockId" exact element={<EditLock />} />

        <Route path="/personel" exact element={<Personels />} />
        <Route path="/personel/add" exact element={<AddPersonel />} />
        <Route path="/personel/edit/:personelId" element={<EditPersonel />} />

        <Route path="/key" exact element={<Keys />} />
        <Route path="/key/add" exact element={<AddKey />} />
        <Route path="/key/edit/:keyId" exact element={<EditKey />} />
        <Route path="/key/position" exact element={<KeyPosition />} />
      </Routes>
    </Router>
    // <div>
    //   <div className="border">
    //     <Dashboard />
    //     {/* <NavigationBar name="Muhamad Taruna" /> */}
    //   </div>
    // </div>
  );
};

export default AppRouter;
