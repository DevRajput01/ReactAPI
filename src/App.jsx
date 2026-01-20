import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {Button} from '@mui/material';
import Page1 from './Components/Page1';
import Page2 from './Components/Page2';
import Page3 from './Components/Page3';

const App = () => {
  return (
    <>
    <Router>
      
      <nav className='flex justify-center' style={{ padding: "20px", margin: "10px" }}>
        <Link to="/page1" style={{ margin: "10px" }}>
        <Button variant="contained" color="success">API Edit Delete Update</Button>
        </Link>
        <Link to="/page2" style={{ margin: "10px" }}>
        <Button variant="contained" color="success">Grid In TailwindCss</Button>
        </Link>
         <Link to="/page3" style={{ margin: "10px" }}>
        <Button variant="contained" color="success">All User's Data</Button>
        </Link>
      </nav>

      <Routes>
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
      </Routes>
    </Router>
         
    </>
  );
};

export default App;
