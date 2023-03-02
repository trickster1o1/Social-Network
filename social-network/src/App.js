import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './mobile.css';
import { Route , BrowserRouter , Routes } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import AddPost from './AddPost';
import SetProfile from './SetProfile';
import ReduxTrial from './redux-trial/ReduxTrial';
import { useSelector } from 'react-redux';
import Message from './chat';
function App() {
  let theme = useSelector((state)=>state.theme.value);
  return (
    <div className={theme && theme === 'dark' ? "App dark" : "App"}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path='/trial' element={<ReduxTrial />} />
          <Route path='/message' element={<Message />} />
          
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
