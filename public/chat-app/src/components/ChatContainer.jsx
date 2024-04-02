import React,{useState, useEffect, useRef} from 'react'
import LogOut from './LogOut'
import ChatInput from './Chatinput';
import Messages from './Messages'
import axios from 'axios';
import {v4 as uuidv4} from "uuid";
import styled from "styled-components";
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';
//xử lý tin nhắn
export default function ChatContainer({currentChat,currentUser,socket}) {

    const [messages, setMessages] = useState([]);
    const [arrivalMessage,setArrivalMessage] = useState(null)
    const scrollRef = useRef();

    const fetchMessages = async (msg) => {
        console.log(currentChat)
        console.log(currentUser);
        if(currentChat){
            const response = await axios.post(getAllMessagesRoute, {
                from: currentUser._id,
                to: currentChat._id,
                message: msg,
            });
            setMessages(response.data);
        }
    }

    useEffect(() => {
        fetchMessages();
    }, [currentUser,currentChat]);
//    useEffect(async() => {
//         const response = await axios.post(getAllMessagesRoute,{
//             from: currentUser._id,
//             to: currentChat._id,
//         });
//         setMessages(response.data);
//     },[currentChat]);

const handleSendMsg = async (msg) => {
  if (msg.startsWith("<img")) {
    // Tin nhắn là hình ảnh, gửi tin nhắn qua socket và cập nhật state
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg
    });
 // Tin nhắn là hình ảnh, gọi API lưu tin nhắn và sau đó gửi tin nhắn qua socket
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    const newMessage = { fromSelf: true, message: msg };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  } else {
    try {
      // Tin nhắn là văn bản, gọi API lưu tin nhắn và sau đó gửi tin nhắn qua socket
      await axios.post(sendMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      });

      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: currentUser._id,
        message: msg,
      });

      const newMessage = { fromSelf: true, message: msg };
      setMessages(prevMessages => [...prevMessages, newMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
};



    useEffect (()=>{
        if(socket.current){
            socket.current.on("msg-recieve",(msg)=>{
                setArrivalMessage({fromSelf:false,message:msg});
            });
        }
    },[]);

    useEffect(()=>{
        arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage]);
    },[arrivalMessage])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"});
    },[messages]);

  return (
    <>
    {
    currentChat && (
    <Container>
      <div className="chat-header py-8 px-8">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <LogOut />
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => {
          const isImage = message.message.startsWith("<img");
          return (
            <div ref={index === messages.length - 1 ? scrollRef : null} key={uuidv4()}>
            <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
              <div className="content">
                {isImage ? (
                  <img src={message.message.match(/src="([^"]+)"/)[1]} alt="Sent Image" />
                ) : (
                  <p>{message.message}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>

    )
    }
        
    </>
  )

}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    z-index:4;
    align-items: center;
    
    background-color: rgb(17 24 39);
    .user-details {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    z-index:1;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        margin-top: 1rem;
        padding: 0.5rem;
        font-size: 1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: rgb(31 41 55);
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: rgb(209 213 219);
        color:black;
      }
    }
  }
`;