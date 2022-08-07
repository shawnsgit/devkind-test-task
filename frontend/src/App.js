import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/Login';
import SignUp from './pages/SingnUp';
import Profile from './pages/Profile';

const App = () => (
  <Routes>
    <Route path="/" element={<SignUp />} />
    <Route path="/login" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/profile" element={<Profile />} />
  </Routes>
);
export default App;
