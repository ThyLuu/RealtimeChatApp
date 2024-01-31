import React from 'react'
import Robot from '../assets/robot.gif'

export default function Welcome({currentUser}){
    return(
       <div className='flex flex-col justify-center items-center text-white '>
        <img src={Robot} alt='Robot gif' style={{height:'15rem'}}/>
        <h1>Hello ní <span className='uppercase font-bold text-slate-900'>{currentUser.username}</span> nha!</h1>
        <h3>Bắt đầu cuộc trò chuyện thui!</h3>
       </div>
    )
}


