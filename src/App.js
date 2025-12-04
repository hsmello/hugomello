import './App.css';
import NavBar from './NavBar/NavBar';
import Home from './Pages/Home/Home';
import Projects from './Pages/Projects/Projects';
import InvestmentApp from './Pages/Projects/IndividualProjects/InvestmentApp/InvestmentApp';
import Dashboard from './Pages/Projects/IndividualProjects/Dashboard/Dashboard';

import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";

const Router =
  process.env.NODE_ENV === "production" ? HashRouter : BrowserRouter;
  
function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />  
          <Route path="/home" element={<Home />} />  
          <Route path="/projects" element={<Projects />} />  
          <Route path="/projects/monte-carlo-simulation" element={<InvestmentApp />} />  
          <Route path="/projects/dashboard" element={<Dashboard />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
