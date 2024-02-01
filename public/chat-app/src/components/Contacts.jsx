import React,{useState,useEffect} from 'react'
import Logo from '../assets/logo.svg'

export default function Contacts ({contacts,currentUser,changeChat}) {
  const [currentUserName,setCurrentUserName] = useState(undefined);

  const [currentUserImage,setCurrentUserImage] = useState(undefined);

  const [currentSelected, setCurrentSelected] = useState(undefined);
   
  useEffect(()=>{
    if(currentUser){
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  },[currentUser]);

  const changeCurrentChat = (index,contact) =>{
    setCurrentSelected(index);
    changeChat(contact);
    // console.log({index,contact});
  }
  return(
    <>
      {
        currentUserImage && currentUserName && (
          <div className=" brands bg-gradient-to-r from-slate-600 to-slate-900"
          style={{
            display:'grid',
            gridTemplateRows:'13% 72% 15%',
            overflow:'hidden',
            
          }}>
            <div className='flex items-center gap-2 justify-center py-3'>
                <img src={Logo} alt="logo" className='h-8' />
                <h3 className='text-white uppercase'>Snappy</h3>
            </div>

            <div className='contacts flex flex-col items-center overflow-auto gap-3 mt-2 scrollbar-thin'>
              {
                contacts.map((contact,index)=>{
                  return(
                    <div className={` 
                      rounded-md cursor-pointer
                      contact ${index===currentSelected ? "selected bg-gray-300" :"bg-gradient-to-r from-slate-600 to-slate-800"}`} 
                      key={index}
                      onClick={()=>changeCurrentChat(index,contact)}
                      style={{
                        minHeight:'3rem',
                        width:'90%',
                        padding:'0.1rem',
                        gap:'1rem',
                        alignItems:'center',
                        display:'flex',
                    }}
                    >
                      <div className="avatar">
                      <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar"
                      style={{
                        height:'3rem'
                      }}
                      />
                      </div>

                      <div className="username">
                        <h3 className='text-white'>{contact.username}</h3>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className="current-user bg-gray-800 flex justify-center items-center gap-8 py-3 ">
            <div className="avatar cursor-pointer ">
                      <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" style={{
                        height:'3rem',
                        maxInlineSize:'100%'
                      }}/>
                      </div>

                      <div className="username">
                        <h2 className='text-white'>{currentUserName}</h2>
                      </div>
            </div>
          </div>
          
        )
      }
    </>
  )
}


