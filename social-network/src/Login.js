import Header from './Header';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Login() {
    let [unm, setUnm] = useState('');
    let [pwd, setPwd] = useState('');
    let navigate = useNavigate();
    async function login() {
        let user = {unm, pwd};
        await fetch('http://127.0.0.1:8000/api/login',{
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        })
        .then((res)=>res.json())
        .then((r)=>{
            if(r.msg === 'success') {
                localStorage.setItem('user-info', JSON.stringify(r.user));
                navigate('/');
            } else {
                alert(r.msg);
            }

        })
        .catch((error)=>console.log(error));
    }
    return(
        <div>
            <div className="container">
            <Header />
            <div className="post-form">
                <div className="form-header"><h2>LogIn</h2></div>
                <input type='text' placeholder="Username" onChange={(e)=>setUnm(e.target.value)} />
                <input type='password' placeholder="Password" onChange={(e)=>setPwd(e.target.value)} />
                <div className="bton-holder">
                    <button className="btn btn-secondary" onClick={login}>Login</button>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Login;