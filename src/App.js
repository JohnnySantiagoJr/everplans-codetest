import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Feed from './Feed.js';
import LogIn from './LogIn.js';
import SignUp from './SignUp.js'



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? 
    true : false);
  
  function handleLogIn() {
    setIsLoggedIn(true);
    window.location.href='/';
  }
  
  function handleLogOut() {
    localStorage.clear();
    setIsLoggedIn(false);
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Feed onLogOut={handleLogOut} isLoggedIn={isLoggedIn} />} />
          <Route path="log-in" element={<LogIn onLogIn={handleLogIn} />} />
          <Route path="sign-up" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
