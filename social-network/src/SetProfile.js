import Header from "./Header";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
function SetProfile() {
    let [name, setName] = useState('');
    let [unm, setUnm] = useState('');
    let [phone, setPhone] = useState('');
    let [gender, setGender] = useState('male');
    let [description, setDescription] = useState('');
    let [profilePic, setProfilePic] = useState('');
    let [coverPic, setCoverPic] = useState('');
    const user = JSON.parse(localStorage.getItem('user-info'));
    const navigate = useNavigate();
    useEffect(()=> {
        if(!user) {
            navigate('/login');
        } else {
            setName(user.name);
            setUnm(user.unm);
        }
    }, [])
    async function setProfile() {
        let formData = new FormData();
        formData.append('name',name);
        formData.append('unm',unm);
        formData.append('phone',phone);
        formData.append('gender',gender);
        formData.append('description',description);
        formData.append('profilePic',profilePic);
        formData.append('coverPic',coverPic);
        await fetch('http://127.0.0.1:8000/api/'+user.id+'/set',{
            method:'POST',
            body:formData
        })
        .then((res)=>res.json())
        .then((r)=>console.log(r))
        .catch((e)=>console.log(e));
    }
    return(
        <div className="container">
            <Header />
            <div className="post-form"  style={{'paddingTop':'4em'}}>
                
                <label>Name</label>
                <input type='text' placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} />
                <label>Username</label>
                <input type='text' placeholder="Username" value={unm} onChange={(e)=>setUnm(e.target.value)} />
                
                <label>Profile Picture</label>
                <input type='file' onChange={(e)=>setProfilePic(e.target.files[0])} />

                <label>Cover Picture</label>
                <input type='file' onChange={(e)=>setCoverPic(e.target.files[0])} />
                
                <label>Phone</label>
                <input type='text' placeholder="Phone No." onChange={(e)=>setPhone(e.target.value)} />
                <label>Gender</label>
                <select onChange={(e)=>setGender(e.target.value)}>
                    <option>Male</option>
                    <option>Female</option>
                </select>
                <label>Description</label>
                <textarea placeholder="Description" onChange={(e)=>setDescription(e.target.value)}></textarea>
                <div className="bton-holder">
                    <button className="btn btn-secondary" onClick={setProfile} >Edit</button>
                </div>
            </div>
        </div>
    )
}

export default SetProfile;