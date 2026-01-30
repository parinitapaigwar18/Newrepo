
import './Dashboard.css';
import './Login.css';
import './Registration.css';
import './Addpro.css';
import Registration from './Registration.js'; 
import Login from './Login.js'
import Dashboard from './Dashboard.js';
import Addpro from './Addpro.js';
import AdminRoute from './component/Adminroute.js';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';


function App() {
  return (
    <div>
     
     <Router>
        <Routes>
           <Route path="/registration" element={<Registration />}/>
           <Route path="/" element={<Login />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
           <Route path="/addproduct"element={<AdminRoute>
              <Addpro />
            </AdminRoute>}/>
        </Routes>
     </Router>
     
    </div>
  );
}

export default App;
