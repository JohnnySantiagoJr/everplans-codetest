import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Feed from './Feed.js';
import LogIn from './LogIn.js';
import SignUp from './SignUp.js'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route index element={<Feed />} />
          <Route exact path="/log-in" element={<LogIn />} />
          <Route exact path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
