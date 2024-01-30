
// React: Module cơ bản để sử dụng React.
import React from 'react'

// BrowserRouter, Routes, Route: Các thành phần từ thư viện react-router-dom để quản lý định tuyến trong ứng dụng React.
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Register, Login, Chat: Các component được import để sử dụng trong định tuyến.
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import SetAvatar from './pages/SetAvatar'

// App: Component chính của ứng dụng.
// Sử dụng BrowserRouter để bao bọc tất cả các định tuyến trong ứng dụng.
// Sử dụng Routes để định nghĩa các định tuyến.
// Mỗi Route định nghĩa một đường dẫn và liên kết nó với một component cụ thể.
// Đường dẫn /register sẽ hiển thị component <Register/>.
// Đường dẫn /login sẽ hiển thị component <Login/>.
// Đường dẫn / (mặc định) sẽ hiển thị component <Chat/>.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/setAvatar' element={<SetAvatar/>}/>
        <Route path='/' element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
  )
}
