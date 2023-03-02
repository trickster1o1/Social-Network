// Import the functions you need from the SDKs you need
import './chat.css';
import firebase from 'firebase/compat/app';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import { useState } from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useEffect } from 'react';
import { GrLogout } from "react-icons/gr";
export default function Message() {
    // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
firebase.initializeApp({
    apiKey: "AIzaSyAWQ_6ZP98fneUUWvqWMiVCaDZVYyY8dAo",
    authDomain: "tricksterweb1o1.firebaseapp.com",
    projectId: "tricksterweb1o1",
    storageBucket: "tricksterweb1o1.appspot.com",
    messagingSenderId: "43664423941",
    appId: "1:43664423941:web:5fd2dceff34a23c35af06c"
});
  
  // Initialize Firebase   
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  const [user] = useAuthState(auth);
  const signin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [txt, setTxt] = useState('');
  const sendText = async (e) => {
    e.preventDefault();
    setTxt('');
    const {uid, photoURL, displayName} = auth.currentUser;

    await messagesRef.add({
        text: txt,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
        photoURL
    });
  }
  
  return (
        <div>
            <h2 className='header-main'>Welcome To The Chat Room!!!</h2>
            {user ? 
            <div className='msg-cont'>
                {
                    messages && messages.map(msg =>
                        <>
                            <span>{msg.uid === auth.currentUser.uid ? null : msg.displayName}</span>
                            <div className={msg.uid === auth.currentUser.uid ? 'msgs out' : 'msgs in'} key={msg.id}>
                                {msg.text}
                            </div>
                        </>                            
                        )
                }
                <div>
                    <form onSubmit={sendText} className='msg-form'>
                        <input type="text" value={txt} onChange={(e)=>setTxt(e.target.value)}/>
                        <button>send</button>
                    </form>
                </div>
                <button 
                className='s-btn'
                onClick={()=>auth.signOut()}
                title='Log Out'
                ><GrLogout /></button> 
            </div>
            : <button className='s-btn' onClick={signin}>Sign In</button>}
        </div>
    )
}