import Header from "./Header";
import { useEffect,useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
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
    const param = useParams();
    useEffect(()=> {
        let getProf = async () => {
            await fetch('http://127.0.0.1:8000/api/p/'+user.id)
            .then((res)=>res.json())
            .then((r)=>{
                setPhone(r.profile.number);
                setDescription(r.profile.description);
                setProfilePic(r.profile.profile_pic);
                setCoverPic(r.profile.cover_pic);
            })
            .catch((e)=>console.log(e));
        }
        if(!user) {
            navigate('/login');
        } else {
            setName(user.name);
            setUnm(user.unm);
            if(param.stat === '1'){
                getProf();
            }
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
        
        
        if(param.stat === '0') {
            await fetch('http://127.0.0.1:8000/api/'+user.id+'/set',{
                method:'POST',
                body:formData
            })
            .then((res)=>res.json())
            .then((r)=>console.log(r))
            .catch((e)=>console.log(e));
            
        } else if (param.stat === '1') {
            await fetch('http://127.0.0.1:8000/api/'+user.id+'/update',{
                method:'PUT',
                body:JSON.stringify({
                    'name':name,
                    'unm':unm,
                    'phone':phone,
                    'gender':gender,
                    'description':description,
                    'profilePic':profilePic,
                    'coverPic':coverPic
                }),
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                }
            })
            .then((res)=>res.json())
            .then((r)=>{
                console.log(r);
            })
            .catch((e)=>console.log(e))

        } else {
            navigate('/');
        }
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
                <input type='text' placeholder="Phone No." value={phone} onChange={(e)=>setPhone(e.target.value)} />
                { param && param.stat === '0' ?
                    <><label>Gender</label>
                    <select onChange={(e)=>setGender(e.target.value)}>
                        <option>Male</option>
                        <option>Female</option>
                    </select></>
                    : null
                }
                <label>Description</label>
                <textarea placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                <div className="bton-holder">
                    <button className="btn btn-secondary" onClick={setProfile} >Edit</button>
                </div>
            </div>
        </div>
    )
}

export default SetProfile;