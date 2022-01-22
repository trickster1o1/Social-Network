import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from './Header';

function SignUp() {
    let [fname, setFname] = useState('');
    let [unm, setUnm] = useState('');
    let [email, setEmail] = useState('');
    let [pwd, setPwd] = useState('');
    let navigate = useNavigate();
    // useEffect(()=>{
    //     let signUp = async () => {
    //         await fetch('http://127.0.0.1:8000/api/signup')
    //         .then((res)=>res.json())
    //         .then((r)=>console.log(r))
    //         .catch((e)=>console.log(e.message));
    //     }
    //     signUp();
    // },[])

    async function signup() {
        let userInfo = {fname, unm, email, pwd}
        await fetch('http://127.0.0.1:8000/api/signup', {
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }).then((res)=>res.json())
        .then((r)=>{
            if(r.msg === 'success') {
                localStorage.setItem('user-info', JSON.stringify(r.userInfo));
                navigate('/');
            } else {
                alert(r.msg);
            }
        })
        .catch((error)=>console.log(error));
    }

    function triggerSignup(e) {
        if(e.key === 'Enter') {
            signup();
        }
    }
    return (
        <div className="container">
            <Header />
            <div className="post-form">
                <div className="form-header"><h2>SignUp</h2></div>
                <input type='text' placeholder="Full Name" onChange={(e)=>setFname(e.target.value)} onKeyPress={(e)=>triggerSignup(e)} />
                <input type='text' placeholder="Username" onChange={(e)=>setUnm(e.target.value)} onKeyPress={(e)=>triggerSignup(e)} />
                <input type='email' placeholder="Email" onChange={(e)=>setEmail(e.target.value)} onKeyPress={(e)=>triggerSignup(e)} />
                <input type='password' placeholder="Password" onChange={(e)=>setPwd(e.target.value)} onKeyPress={(e)=>triggerSignup(e)} />
                <div className="bton-holder">
                <span><Link to='/login'>Already have an account, Login</Link></span>
                    <button className="btn btn-secondary" onClick={signup}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;