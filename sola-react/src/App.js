import logo from './logo.svg';
import './App.css';
import login from './pages/Login';
import footer from './pages/Footer';
import main from './pages/Main';
import add from './pages/Add';
import updatedelete from './pages/Updatedelete';

function App() {
  return (
    <div className="App">
      <login />
      <footer address="SoLa Company Wilhelminenhofstraße 75A 12459 Berlin 030 1234567" copyright="&copy;2022 SoLa" termslink="index.html" policylink="index.html" impressumlink="index.html" />
    </div>
  );
}

export default App;
