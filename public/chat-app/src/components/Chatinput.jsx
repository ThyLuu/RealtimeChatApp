import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";


export default function ChatInput({handleSendMsg}) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = ( emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
    //console.log(emojiObject);
  }

  const sendChat = (event) => {
    event.preventDefault();
    if(msg.length>0){
      handleSendMsg(msg);
      setMsg('')
    }
  }

  return (

  <div className="container items-center bg-slate-300" 
    style={{
      display:'grid',
      gridTemplateColumns:'5% 95%',
    }}>

    <div className="button-container  items-center text-white">
      <div className='emoji relative cursor-pointer px-2 text-slate-900'>
        <BsEmojiSmileFill onClick={handleEmojiPickerhideShow}/>
        {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} 
          style={{
           position: 'absolute',
           zIndex:'3',
           top: '-470px',
           backgroundColor: '#080420',
           boxShadow: '0 5px 10px rgb(226 232 240)',
           borderColor: 'rgb(226 232 240)',
        }} />}
      </div>
    </div>

    <form className="input-container flex items-center gap-6 bg-slate-300" onSubmit={(event) => sendChat(event)}>
      <input type='text' placeholder="Nhập tin nhắn..." className="text-black focus:outline-none"   
      onChange={(e) => setMsg(e.target.value)}
      value={msg}
        style={{
          width:"90%",
          height:'100%',
          border:'none',
          paddingLeft:'1rem',
          paddingTop:'0.2rem',
          fontSize:'30px'        }}/>
      <button type="submit">
        <IoMdSend/>
      </button>
    </form>
 
  </div>


  );
}
