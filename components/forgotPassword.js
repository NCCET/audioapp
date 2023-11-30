import React from 'react'
import { useState } from 'react';
import {auth} from  '../config/firebase'
import { sendPasswordResetEmail } from 'firebase/auth';

function Forgotpassword() {

  const forgotPassword =(()=>{
    sendPasswordResetEmail(auth, email).then(()=>{
        alert("check your email")

    }).catch((error)=>{

    })
  })
  
  const [email, setPassword] =useState('')

  return (
    <div className="container">
       <h4>Reset your password</h4> 

    <input type="text" placeholder="Enter email" onChange={(event)=>setPassword(event.target.value)}/>
      <br></br><br></br>
    <button onClick={forgotPassword}>ResetPassword</button>
    </div>
  );
}

export default Forgotpassword;