import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Header from './Components/Header/Header';
import SignupSignIn from './Components/SignUpSignIn/SignupSignIn';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './Components/SignUpSignIn/Login';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth'; // Make sure this import is correct
import { auth } from './firebase'; // Make sure this import is correct

function App() {
  const [user, setUser] = useState(null);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setUid(user.uid);
      }
    });
    return () => unsubscribe();
  }, []); // Make sure you pass dependencies if needed

  return (
    <div>
      <ToastContainer />
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<SignupSignIn />} />
          <Route path='/dashboard' element={<Dashboard uid={uid} />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
