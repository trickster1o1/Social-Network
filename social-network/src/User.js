import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Profile from "./Profile";
import Header from "./Header";

function User() {
    const param = useParams();
    let [userData, setUserData] = useState([]);
    useEffect(()=> {
        async function fetchProfile() {
            await fetch('http://127.0.0.1:8000/api/u/'+param.user)
            .then((res)=>res.json())
            .then((r)=>setUserData(r))
            .catch((e)=>console.log(e));
        }
        fetchProfile();
    }, [param.user])
    return (
        <div className="container">
            <Header />
            <div  style={{'paddingTop':'3.5em'}}>
                {
                    userData && userData.msg === 'error404' ? 'user not found' : 
                    userData && userData.msg === 'success' && userData.posts ? <Profile uPost = {userData} /> 
                    : 'Loading...'
                }
            </div>
        </div>
    );
}

export default User;