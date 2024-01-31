import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { allUsersRoute } from '../utils/APIRoutes';
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome';

function Chat() {
  const [contacts,setContacts] = useState([]);

  const [currentUser,setCurrentUser] = useState(undefined);

  const [currentChat,setCurrentChat] = useState(undefined); 

  const navigate = useNavigate();
 
  const fetchUser = async () => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate('/login');
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
    }

  }
  useEffect(() => {
    fetchUser()
  }, []);

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
          bg-gradient-to-r from-slate-600 to-slate-800 h-5/6 w-5/6 rounded-lg
          "
          style={{
            display:'grid',
            gridTemplateColumns:'25% 75%'
          }}>
            <Contacts 
              contacts={contacts}
              currentUser={currentUser}
              changeChat={handleChatChange}/>

            <Welcome currentUser={currentUser}/>
        </div>

    </div>
  )
}

export default Chat
