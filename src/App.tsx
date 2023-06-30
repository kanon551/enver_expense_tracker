import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Layout from './global/Layout';

function App() {
  return (
    <div style={{background:'#ebebeb'}}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
