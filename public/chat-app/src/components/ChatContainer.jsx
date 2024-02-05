import React,{useState, useEffect, useRef} from 'react'
import LogOut from './LogOut'
import ChatInput from './Chatinput';
import axios from 'axios';
import {v4 as uuidv4} from "uuid";
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
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
          });
          socket.current.emit("send-msg",{
            to: currentChat._id,
            from:currentUser._id,
            message:msg,
          });
          const msgs = [...messages];
          msgs.push({fromSelf: true,message:msg});
          setMessages(msgs);
    } ;

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
        <div className=''> 
        <div className='chat-header flex justify-between items-center px-8 bg-gradient-to-r from-slate-600 to-slate-800 py-2 '>
            <div className='user-details flex items-center gap-4 '>
                <div className='avatar'>
                    <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" style={{height:'3rem'}}/>
                </div>
                <div className='username'>
                    <h3 className='text-white'>{currentChat.username}</h3>
                </div>
            </div>

        <LogOut/>
        </div>

        { <div className='chat-messages flex gap-x-10 overflow-auto flex-col p-10'>
            {
                messages.map((message) => {
                    return(
                        <div ref={scrollRef} key={uuidv4()}>
                            <div className={`message flex flex-col gap-1 overflow-auto ${message.fromSelf ? "sended justify-items-end" : "recieved"}`}>
                                <div className='content max-5 border-r-2'>
                                    <p>
                                        {message.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                
                }
             )
            }
        </div> }

        <ChatInput handleSendMsg={handleSendMsg}></ChatInput>
        </div>

        )
        
    }
    </>
    
    
  )

}
