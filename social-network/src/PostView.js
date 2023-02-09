import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function PostView() {
    const param = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user-info'));
    const [loader, setLoader] = useState(1);
    let [postData, setPostData] = useState([]);
    let [reply, setReply] = useState('');
    const [reload, setReload] = useState(0);
    useEffect(()=> {
        let gPost = async () => {
            await fetch('http://127.0.0.1:8000/api/post/'+param.user)
            .then((res)=>res.json())
            .then((r)=>{setPostData(r); setLoader(0);})
            .catch((e)=>console.log(e));
        }
        if(param && param.user) {
            gPost();
        }
    }, [reload]);

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

   let postCmnt = async () => {
       if(!user) {
            navigate('/login');
       } else {
        if(reply) {
            setLoader(1);
            await fetch('http://127.0.0.1:8000/api/postCmnt',{
                method:'POST',
                body:JSON.stringify({
                    'reply': reply,
                    'post': postData.post.id,
                    'user':user.id
                }),
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                }
            }).then((res)=>res.json())
            .then((r)=>{
                setReload(reload+1);
                setReply('');
                setLoader(0);
            })
            .catch((e)=>console.log(e));
        }
       }
        
    }
    return(
        <>
            {postData && postData.msg === 'error404' ? postData.msg : postData && postData.msg === 'success'  && postData.post ? 
                <div key={postData.post.id} className="post-container">
                    <div className="post-head">
                   <span className='profile_p'> <img src={ postData.profile && postData.profile.profile_pic !== null ? 'http://127.0.0.1:8000/storage/'+postData.profile.profile_pic : 'http://127.0.0.1:8000/storage/profile/default.jpg'} alt="error404" /> </span>
                        <Link to={'/profile/'+postData.user.unm}>{postData.user.name}</Link></div>
                        <span className='post-time'>{postData.post.created_at}</span>
                    
                    <div className="post-body">
                        <span className="post-title">{postData.post.title}</span>
                        {postData.post.post}
                        <div className="post-img-cont">
                            <img src={'http://127.0.0.1:8000/storage/'+postData.post.file} alt='notAvailable...' />
                        </div>
                    </div>
                    {postData.like !== null && postData.like.like_count !== '0' ?
                        <div className="post-msg">{postData.like.like_count} likes</div>
                        : null
                    }
                    <div className='post-tail'>
                        <div onClick={()=>likePost(postData.id)} id={'like'+postData.id}  className={user && postData.like !== null && postData.like.likes.includes(','+user.id+',') ? 'post-liked' : null} >
                            L
                        </div>
                    </div>
                    <div className="post-comment">
                        <div className="loader-cmt" style={{'display': loader ? 'flex' : 'none'}}>
                            Loading....
                        </div>
                                <div>
                                    <textarea placeholder="Reply" onChange={(e)=>setReply(e.target.value)} value={reply} />
                                    <div className ='comment-submit-btn'>
                                        <button onClick={postCmnt}>Replys</button>
                                    </div>
                                </div>
                        {postData && postData.comments ? 
                            postData.comments.map((comment)=>
                                <div key={comment.id}>
                                    <div>
                                    <span className='p_p'> <img src={ comment.user.profile && comment.user.profile.profile_pic !== null ? 'http://127.0.0.1:8000/storage/'+comment.user.profile.profile_pic : 'http://127.0.0.1:8000/storage/profile/default.jpg'} alt="error404" /></span>
                                    <span style={{'marginLeft':'.2em'}}>{comment.user.name}</span>
                                    </div>
                                    <span className="cmnt-rply-to">Replying to @{postData.user.unm}</span>
                                    <p>{comment.reply}</p>
                                </div>
                            )
                        : '...'}
                    </div>
                </div>: 'loading...'
            }
        </>
    );
}

export default PostView;