import Header from './Header';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
function Login() {
    let [unm, setUnm] = useState('');
    let [pwd, setPwd] = useState('');
    let navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('user-info')) {
            navigate('/');
        }
    },[])
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

    function triggerLogin(e) {
        if(e.key === 'Enter') {
            login();
        }
    }
    return(
        <div>
            <div className="container">
            <Header />
            <div className="post-form">
                <div className="form-header"><h2>LogIn</h2></div>
                <input type='text' placeholder="Username" onChange={(e)=>setUnm(e.target.value)} onKeyPress={(e)=>triggerLogin(e)} />
                <input type='password' placeholder="Password" onChange={(e)=>setPwd(e.target.value)} onKeyPress={(e)=>triggerLogin(e)} />
                <div className="bton-holder">
                <span><Link to='/signup'>Dont have an account, Register</Link></span>
                    <button className="btn btn-secondary" onClick={login}>Login</button>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Login;