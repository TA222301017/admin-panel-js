import './App.css';
import NavigationBar from './components/NavigationBar';
import SignInSide from './components/template/SignInSide';
import SignIn from './components/template/SignIn';
import Dashboard from './components/template/Dashboard/Dashboard';

function App() {
  return (
    <div>
      <div className='border'>
        
        <SignIn />
        {/* <NavigationBar name="Muhamad Taruna" /> */}
      </div>
    </div>

  )
}

export default App;
