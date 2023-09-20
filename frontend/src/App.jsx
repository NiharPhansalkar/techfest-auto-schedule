import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Navbar_temp from './components/Navbar_temp';
// import Home from './pages/Home';
import Home_temp from './pages/Home_temp';
import './styles/globalStyles.css';

function App() {
  return (
    <Router>
      <Navbar_temp />
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home_temp/>} />
      </Routes>
      
    </Router>
  );
}

export default App;
