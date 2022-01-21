import Header from "./Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function AddPost() {
    let [postData, setPostData] = useState('');
    let [title, setTitle] = useState('');
    let user = JSON.parse(localStorage.getItem('user-info'));
    let navigate = useNavigate();
    useEffect(()=> {
        if(!user) {
            navigate('/login');
        }
    }, []);
    async function addPost() {
        if(user) {
            await fetch('http://127.0.0.1:8000/api/addpost/'+user.id, {
                method:'POST',
                body:JSON.stringify({
                    'title':title,
                    'post':postData
                }),
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                }
            })
            .then((res)=>res.json())
            .then((r)=>{
                if(r.msg === 'success') {
                    navigate('/');
                } else {
                    alert(r.msg);
                }
            })
            .catch((e)=>console.log(e));
        }
        
    }
    return(
        <div className="container">
            <Header />
            <div className="post-form">
                <div className="form-header"><h2>Post</h2></div>
                <input placeholder="Title" type='text' onChange={(e)=>setTitle(e.target.value)} />
                <textarea placeholder="What's happening" onChange={(e)=>setPostData(e.target.value)}></textarea>
                <div className="bton-holder">
                    <button className="btn btn-secondary" onClick={addPost}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default AddPost;