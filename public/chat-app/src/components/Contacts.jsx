import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.svg";
import { RxHamburgerMenu } from "react-icons/rx";
import SideBar from "./SideBar";
import LogOut from "./LogOut";
import Tooltip from '@mui/material/Tooltip';


export default function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);

  const [currentUserImage, setCurrentUserImage] = useState(undefined);

  const [currentSelected, setCurrentSelected] = useState(undefined);

  const [searchKeyword, setSearchKeyword] = useState("");
  

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
    // console.log({index,contact});
  };

  //search user 
  const filteredContacts = contacts.filter((contact) => {
    // Check if contact._id exists before calling toLowerCase()
    if (contact._id) {
      return contact.username
        .toLowerCase()
        .includes(searchKeyword.toLowerCase());
    }
    return false; // Exclude contacts without a name property
  });



  return (
    <>
      {currentUserImage && currentUserName && (
        <div
          className=" brands bg-gradient-to-r from-slate-600 to-slate-900"
          style={{
            display: "grid",
            gridTemplateRows: "13% 10% 62% 15%",
            overflow: "hidden",
          }}
        >
         
          <div className="flex items-center px-4 py-2  ">
            <Tooltip title="Đăng xuất">
              <div className='flex items-center'>
                  <LogOut/>
              </div>
            </Tooltip>

            <div className='flex items-center justify-center px-8'>
              <img src={Logo} alt="logo" className="h-10" />
              <h3 className="text-white uppercase mt-2" >StormyGram</h3>
            </div>
             
          </div>
          
          <div className='px-4 pb-10 items-center'>
            <input
                type="text"
                placeholder="Tìm kiếm bạn bè..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="border rounded-md mt-2 px-2 focus:outline-none py-2"
                style={{width:'99%'}}
              />
          </div>
        
          <div className="contacts flex flex-col items-center overflow-auto gap-3 mt-2">
            {filteredContacts.map((contact, index) => {
              return (
                <div
                  className={` 
                      rounded-md cursor-pointer
                      contact ${
                        index === currentSelected
                          ? "selected bg-gradient-to-r from-slate-400 to-slate-600"
                          : "bg-gradient-to-r from-slate-600 to-slate-800"
                      }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                  style={{
                    minHeight: "3rem",
                    width: "90%",
                    padding: "0.1rem",
                    gap: "1rem",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                      style={{
                        height: "3rem",
                      }}
                    />
                  </div>

                  <div className="username">
                    <h3 className="text-white">{contact.username}</h3>
                  </div>
                </div>
              );
            })}
            
          </div>
          <div className="current-user bg-gray-800 flex justify-center items-center gap-8 py-3 ">
            <div className="avatar cursor-pointer ">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
                style={{
                  height: "3rem",
                  maxInlineSize: "100%",
                }}
              />
            </div>
            <div className="username cursor-pointer">
                <h2 className='text-white'>{currentUserName}</h2>
            </div>
          </div>
        </div>
        
      )}
    </>
  );
}
