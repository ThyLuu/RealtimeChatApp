import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { MdLogout } from "react-icons/md";

export default function LogOut() {

    const navigate = useNavigate();

    const handleClick = async() =>{
        localStorage.clear();
        navigate('/login');
    }

    return (
        <button className='flex justify-center items-center p-1 cursor-pointer bg-indigo-100 rounded-md' onClick={handleClick}>
             <MdLogout/>
        </button>
       
  )
}
