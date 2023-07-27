import React, { useState } from 'react'
import style from './MailList.module.css'
import emailjs from '@emailjs/browser';


const MailList = () => {
  const [mail,setEmail] = useState({Email:""});
  const handelChange = (e)=>{
    setEmail({
      ...mail,
      [e.target.name]:e.target.value
    })
  };
  const handelEmail = (e)=>{
    e.preventDefault();
    emailjs.send('service_lo29oau','template_betegon',mail,'DvOi-9Phq22YyGjn4')
        .then((result) => {
          console.log("sent");
          console.log(result.text);
        },(error) => {
          console.log(error.text);
        });
      
  };
  return (
    <div className={style.mailList}>
      <h1 className={style.mailTitle}>Save time, save money!</h1>
      <span className={style.mailDesc}>Sign up and we'll send the best deals to you.</span>
      <div className={style.mailInputContainer}>
        <input name="Email" type="text" placeholder="Your Email" onChange={handelChange} value={mail.Email} />
        <button onClick={handelEmail}>Subscribe</button>
      </div>
    </div>
  )
}

export default MailList
