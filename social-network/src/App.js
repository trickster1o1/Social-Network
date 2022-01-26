import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './mobile.css';
import { Route , BrowserRouter , Routes } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import AddPost from './AddPost';
import SetProfile from './SetProfile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path='/setprofile/:stat' element={<SetProfile />} />

          <Route path="/:page" element={<Home />} />
          <Route path="/:page/:user" element={<Home />} />
          <Route path='/' element= {<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
