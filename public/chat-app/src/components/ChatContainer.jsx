import React from 'react'
import LogOut from './LogOut'


export default function ChatContainer({currentChat}) {
  return (
    <>
    {
        currentChat && (
        <div className='pt-2'> 
        <div className='chat-header flex justify-between items-center px-8'>
            <div className='user-details flex items-center gap-4'>
                <div className='avatar'>
                    <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" style={{height:'3rem'}}/>
                </div>
                <div className='username'>
                    <h3 className='text-white'>{currentChat.username}</h3>
                </div>
            </div>

        <LogOut/>
        </div>

        <div className='chat-messages'></div>

        <div className='chat-input'></div>
        </div>

        )
        
    }
    </>
    
    
  )
}
