import './App.css';


// Custom components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import EmailPage from './components/features/email/EmailPage';
import CampaignPage from './components/features/campaigns/CampaignPage';
import Layout from './components/features/campaigns/details/Layout';
import LeadsPage from './components/features/campaigns/details/leads/LeadsPage';

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
                <Route path='/campaigns/:id' element={<Layout/>}>
                  <Route path='insight'/>
                  <Route path='sequences'/>
                  <Route path='leads' element={<LeadsPage/>}/>
                  <Route path='schedule'/>
                  <Route path='settings'/>
                </Route>
              </Routes>
            </div>
          </BrowserRouter>
        </div>
    </>
  );
}

export default App;
