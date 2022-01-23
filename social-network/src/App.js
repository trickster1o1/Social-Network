import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './mobile.css';
import { Route , BrowserRouter , Routes } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import AddPost from './AddPost';
import User from './User';
import SetProfile from './SetProfile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path='/u/:user' element={<User />} />
          <Route path='/setprofile' element={<SetProfile />} />

          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
