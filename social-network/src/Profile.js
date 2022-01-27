import { useNavigate } from "react-router-dom";
import {useState} from 'react';

function Profile(props) {
    const navigate = useNavigate();
    let [noPost, setNoPost] = useState(2);
    function triggerEdit() {
        if(props.uPost.profile === null) {
            navigate('/setprofile/0');
        } else {
            navigate('/setprofile/1');
        }
    }
   const user = JSON.parse(localStorage.getItem('user-info'));
   let likePost = async (id) => {
        if(!user) {
            navigate('/login');
        } else {
            document.getElementById('like'+id).classList.toggle('post-liked');
            await fetch('http://127.0.0.1:8000/api/likepost/'+user.id+'/'+id,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                }
            }).then((res)=>res.json())
            .then((r)=>console.log(r))
            .catch((e)=>console.log(e));
        }
      
   }
    return(
        <>
            <div className="profile-head">
                {
                    props.uPost.profile === null ? 
                    <div className="profile-cover">
                            <div className="profile-pic">
                                <img src='/logo512.png' alt='error404' />
                            </div>
                            <div className="profile-desc">
                                <span><b>{props.uPost.user.name}</b></span>
                                <p>Some text here</p>
                                {user && user.unm === props.uPost.user.unm ? <button className="btn btn-secondary" onClick={triggerEdit}>Edit</button> : null}
                            </div>
                        </div> 
                     :
                    <div className="profile-cover">
                            {
                                props.uPost.profile.cover_pic !== 'null' ?
                                <div className="cover-pic">
                                    <img src={'http://127.0.0.1:8000/storage/'+props.uPost.profile.cover_pic} alt='...' />
                                </div>
                                : null
                            }
                        <div className={props.uPost.profile.cover_pic !== 'null' ? "profile-pic wc" : "profile-pic"}>
                            
                            {
                                props.uPost.profile.profile_pic !== 'null' 
                                ? <img src={'http://127.0.0.1:8000/storage/'+props.uPost.profile.profile_pic} alt='error404' />
                                : <img src='/logo512.png' alt='error404' />
                            }
                        </div>
                        <div className="profile-desc">
                            <span><b>{props.uPost.user.name}</b></span>
                            <p>{props.uPost.profile.description}</p>
                            {user && user.unm === props.uPost.user.unm ? <button className="btn btn-secondary" onClick={triggerEdit}>Edit</button> : null}
                        </div>
                    </div>
                }
            </div>
            { props.uPost.posts.length === 0 ? 'No Posts yet' : 
                <>
                {props.uPost.posts.slice(0).reverse().slice(0, noPost).map((post) => 
                    <div key={post.id} className="post-container">
                        <div className="post-head">
                        <span className='profile_p'> <img src={'http://127.0.0.1:8000/storage/'+props.uPost.profile.profile_pic} alt="error404" /> </span>
                            {props.uPost.user.name}
                        </div>
                        <div className="post-body">
                            <span className="post-title">{post.title}</span>
                            {post.post}
                            <div className="post-img-cont">
                                <img src={'http://127.0.0.1:8000/storage/'+post.file} alt='notAvailable...' />
                            </div>
                        </div>
                        {post.like !== null && post.like.like_count !== '0' ?
                            <div className="post-msg">{post.like.like_count} likes</div>
                            : null
                        }
                        <div className='post-tail'>
                            <div onClick={()=>likePost(post.id)} id={'like'+post.id}  className={user && post.like !== null && post.like.likes.includes(','+user.id+',') ? 'post-liked' : null} >
                                L
                            </div>
                        </div>
                    </div>
                )}
                <div onClick={()=>setNoPost(noPost+2)} className="more-post" style={noPost > props.uPost.posts.length ? {'display':'none'} : {'display':'flex'}} >Load more</div>
                </>
            }
        </>
    )
}

export default Profile;