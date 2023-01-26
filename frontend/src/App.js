import './App.css';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


// Custom components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import EmailPage from './components/features/email/EmailPage';
import CampaignPage from './components/features/campaigns/CampaignPage';
import Layout from './components/features/campaigns/details/Layout';
import LeadsPage from './components/features/campaigns/details/leads/LeadsPage';
import SequencesPage from './components/features/campaigns/details/sequences/SequencesPage';
import SettingsPage from './components/features/campaigns/details/settings/SettingsPage';
import SchedulePage from './components/features/campaigns/details/schedule/SchedulePage';
import TemplatesPage from './components/features/templates/TemplatePage';
import InboxPage from './components/features/inbox/InboxPage';



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
                <Route path='/template' element={<TemplatesPage/>}/>
                <Route path='/inbox/:email' element={<InboxPage/>} />
                <Route path='/campaigns/:id' element={<Layout/>}>
                  <Route path='insight'/>
                  <Route path='sequences' element={<SequencesPage/>}/>
                  <Route path='leads' element={<LeadsPage/>}/>
                  <Route path='schedule' element={<SchedulePage/>}/>
                  <Route path='settings' element={<SettingsPage/>}/>
                </Route>
                <Route path='/template' element={<TemplatesPage/>}/>
              </Routes>
            </div>
          </BrowserRouter>
        </div>
    </>
  );
}

export default App;
