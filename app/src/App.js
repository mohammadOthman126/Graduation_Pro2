import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ButtonAppBar from './component/navBar';
import Home from './component/Home';
import Hello from './component/Hello';
import CredentialsSignInPage from './component/Login';
import Register from './component/register';
import Account from './component/account';

function App() {
  return (
    <Router>
      <ButtonAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hello" element={<Hello />} />
        <Route path="/login" element={< CredentialsSignInPage/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        
      </Routes>
    </Router>
  );
}

export default App;
