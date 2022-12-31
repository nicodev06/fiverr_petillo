import './App.css';
import { useContext } from 'react';
import { Context } from './utils/context';

// Custom components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import {
  BrowserRouter, 
  Routes, 
  Route
} from 'react-router-dom';

function App() {
  
  return (
    <>
        <div className='app flex'>
          <BrowserRouter>
            <Sidebar/>
            <div>
              <Navbar/>
              <Routes>
                <Route path='/home'/>
              </Routes>
            </div>
          </BrowserRouter>
        </div>
    </>
  );
}

export default App;
