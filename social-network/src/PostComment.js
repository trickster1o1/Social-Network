import { useEffect, useState } from "react";

function PostComment(props) {
    const user = JSON.parse(localStorage.getItem('user-info'));
    let [show, setShow] = useState('');
    let [reply, setReply] = useState('');
    useEffect(()=>{
        setShow(props.show);
    }, [props.meter]);

    let postCmnt = async () => {
        setShow('none');
        await fetch('http://127.0.0.1:8000/api/postCmnt',{
            method:'POST',
            body:JSON.stringify({
                'reply': reply,
                'post': props.post.id,
                'user':user.id
            }),
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }).then((res)=>res.json())
        .then((r)=>console.log(r))
        .catch((e)=>console.log(e));
    }
    return (
        <div className='push-comment' style={props && props.show ? {'display':show} : null } id='p-cmnt'>
                <div className='push-comment-head'>
                    <span id="cmnt-cros" onClick={()=>setShow('none')} >X</span>
                </div>
                <div className="push-comment-body">
                    {props && props.post && props.post.user ?
                        <div className="comment-body-head">
                            <span className='p_p'> <img src={'http://127.0.0.1:8000/storage/'+props.post.user.profile.profile_pic} alt="error404" /> </span>
                            <span className='post-comment-head'><b>{props.post.user.name}</b><span style={{'color':'rgba(0,0,0,0.6)'}}>@{props.post.user.unm}</span></span>
                        </div>
                    : null}
                    <p style={{'marginBottom':'1.2em'}}>
                        {props.post.post}
                    </p>
                    <p style={{'color':'rgba(0,0,0,.6)','paddingBottom':'2em','marginBottom':'-1em','borderLeft':'2px solid rgba(0,0,0,.2)','marginLeft':'2em'}}>
                        <span style={{'marginLeft':'-2em'}}>Replying to {props && props.post && props.post.user ? <span style={{'color':'rgba(0,0,255,.6)'}}>@{props.post.user.unm}</span> : null}</span>
                    </p>
                </div>
                <div className="push-comment-reply">
                    <span className='p_p'> <img src={'http://127.0.0.1:8000/storage/'+user.profile.profile_pic} alt="error404" /> </span>
                    <textarea type='text' placeholder="Reply" onChange={(e)=>setReply(e.target.value)} />
                </div>
                <div className="push-comment-tail">
                    <div>
                        ...
                    </div>
                    <div className="comment-submit-btn">
                        <button onClick={postCmnt}>Reply</button>
                    </div>
                </div>
        </div>
    );
}

export default PostComment;