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

  <div className="container  items-center bg-slate-300 h-8" 
    style={{
      display:'grid',
      gridTemplateColumns:'5% 95%',
    }}>

    <div className="button-container  items-center text-white ">
      <div className='emoji relative cursor-pointer px-2 text-slate-900'>
        <BsEmojiSmileFill onClick={handleEmojiPickerhideShow}/>
        {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} 
          style={{
           position: 'absolute',
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
          fontSize:'30px'        }}/>
      <button className="submit">
        <IoMdSend/>
      </button>

    </form>
 
    
  </div>
  );
}

// const Container = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 5% 95%;
//   background-color: #080420;
//   padding: 0 2rem;
//   @media screen and (min-width: 720px) and (max-width: 1080px) {
//     padding: 0 1rem;
//     gap: 1rem;
//   }
//   .button-container {
//     display: flex;
//     align-items: center;
//     color: white;
//     gap: 1rem;
//     .emoji {
//       position: absolute;
//       svg {
//         font-size: 1.5rem;
//         color: #ffff00c8;
//         cursor: pointer;
//       }
//       .emoji-picker-react {
//         position: relative;
//         top: -350px;
//         background-color: #080420;
//         box-shadow: 0 5px 10px #9a86f3;
//         border-color: #9a86f3;
//         .emoji-scroll-wrapper::-webkit-scrollbar {
//           background-color: #080420;
//           width: 5px;
//           &-thumb {
//             background-color: #9a86f3;
//           }
//         }
//         .emoji-categories {
//           button {
//             filter: contrast(0);
//           }
//         }
//         .emoji-search {
//           background-color: transparent;
//           border-color: #9a86f3;
//         }
//         .emoji-group:before {
//           background-color: #080420;
//         }
//       }
//     }
   
//   }
//   .input-container {
//     width: 100%;
//     border-radius: 2rem;
//     display: flex;
//     align-items: center;
//     gap: 2rem;
//     background-color: #ffffff34;
//     input {
//       width: 90%;
//       height: 60%;
//       background-color: transparent;
//       color: white;
//       border: none;
//       padding-left: 1rem;
//       font-size: 1.2rem;

//       &::selection {
//         background-color: #9a86f3;
//       }
//       &:focus {
//         outline: none;
//       }
//     }
//     button {
//       padding: 0.3rem 2rem;
//       border-radius: 2rem;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       background-color: #9a86f3;
//       border: none;
//       @media screen and (min-width: 720px) and (max-width: 1080px) {
//         padding: 0.3rem 1rem;
//         svg {
//           font-size: 1rem;
//         }
//       }
//       svg {
//         font-size: 2rem;
//         color: white;
//       }
//     }
//   }
// `;
