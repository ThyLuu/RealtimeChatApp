import React,{useState,useEffect, useRef} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { allUsersRoute,host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from "socket.io-client"

function Chat() {
  const socket = useRef();

  const [contacts,setContacts] = useState([]);

  const [currentUser,setCurrentUser] = useState(undefined);

  const [currentChat,setCurrentChat] = useState(undefined); 

  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();
 
  const fetchUser = async () => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate('/login');
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      setIsLoaded(true);
    }

  }
  useEffect(() => {
    fetchUser()
  }, []);

  useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  },[currentUser])

  const currentUserFunc = async() =>{
    if (currentUser) {
      // Kiểm tra currentUser đã set ava hay chưa
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }
    }
  }
  useEffect( () => {
    currentUserFunc();
  }, [currentUser]);

  //Handle Chat
  const handleChatChange = (chat) =>{
    setCurrentChat(chat);

  }

  return (
    <div 
      className="
      flex flex-col justify-center gap-4 items-center h-screen w-screen  bg-slate-950 
    ">
      <div 
        className="
          bg-gradient-to-r from-slate-400 to-slate-600 h-5/6 w-5/6
          "
          style={{
            display:'grid',
            gridTemplateColumns:'25% 75%'
          }}>
            <Contacts 
              contacts={contacts}
              currentUser={currentUser}
              changeChat={handleChatChange}/>

              { 
                isLoaded && currentChat === undefined 
                  ? (<Welcome currentUser={currentUser}/>) 
                  : (
                  
                  <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
                  ) 
              }

            
        </div>

    </div>
  )
}

export default Chat
