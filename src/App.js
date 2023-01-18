import "./App.css";
import Dashboard from "./components/Dashboard";
import NavigationBar from "./components/NavigationBar";
import SignIn from "./components/SignIn";
import SignInSide from "./components/SignInSide";

function App() {
  return (
    <div>
      <div className="border">
        <Dashboard />
        {/* <NavigationBar name="Muhamad Taruna" /> */}
      </div>
    </div>
  );
}

export default App;
