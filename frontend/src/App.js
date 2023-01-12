import './App.css';
import { useContext } from 'react';
import { Context } from './utils/context';

// Custom components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import EmailPage from './components/features/email/EmailPage';
import CampaignPage from './components/features/campaigns/CampaignPage';

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
                <Route path='/email' element={<EmailPage/>}/>
                <Route path='/campaigns' element={<CampaignPage/>}/>
              </Routes>
            </div>
          </BrowserRouter>
        </div>
    </>
  );
}

export default App;
