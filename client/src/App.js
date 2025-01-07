import logo from './logo.svg';
import './App.css';
import './comp/todo'
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

import './index.css';
import './flags.css';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api'
import ALLTODOS from './comp/alltodo';
import Menubar from './comp/nanuber';
import Menu from './comp/nanuber';

function App() {
  return (
    <div className="App">
     <Menu/>
      {/* <ALLTODOS></ALLTODOS> */}
  </div>
  );
}

export default App;
