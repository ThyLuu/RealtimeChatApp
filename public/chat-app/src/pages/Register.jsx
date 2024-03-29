import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import Logo from "../assets/logo.svg"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { registerRoute } from '../utils/APIRoutes'
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";

function Register() {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const [isConfirmPassword, setIsConfirmPassword] = useState(false);

    const handleTogglePassword = () => {
        setIsShowPassword(!isShowPassword);
      };
    
      const handleToggleConfirmPassword = () =>{
        setIsConfirmPassword(!isConfirmPassword)
      }


    // useNavigate là một hook được cung cấp bởi thư viện react-router-dom để lấy hàm navigate để 
    // thực hiện điều hướng trong ứng dụng React. Khi bạn muốn chuyển đến một trang khác,
    // có thể gọi navigate('/path') để thực hiện điều hướng đến đường dẫn mong muốn.
    const navigate = useNavigate()


    // useState là một hook của React được sử dụng để khởi tạo một state trong functional component.
    // values: Là state object chứa các giá trị của các trường nhập liệu trong form (username, email, password, confirmPassword).
    // setValues: Là hàm để cập nhật giá trị của values khi có sự thay đổi. Khi hàm này được gọi, React sẽ tự động render lại component với giá trị state mới.
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })


    // event.preventDefault(): Ngăn chặn hành vi mặc định của form khi được submit, ngăn trình duyệt làm mới trang. Điều này giúp tránh mất dữ liệu và giữ cho ứng dụng là một ứng dụng đơn trang (SPA - Single Page Application).
    // handleValidation() để kiểm tra xem các giá trị trong form có hợp lệ không
    // axios.post(registerRoute, { username, email, password }): Sử dụng thư viện axios để thực hiện một yêu cầu HTTP POST đến địa chỉ registerRoute (một hằng số chứa đường dẫn của API đăng ký). Dữ liệu được gửi đi chứa các giá trị từ state values (username, email, password).
    // localStorage.setItem('chat-app-user', JSON.stringify(data.user)): Lưu thông tin người dùng vào localStorage để giữ lại thông tin người dùng giữa các phiên làm việc và sau khi làm mới trang.
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (handleValidation()) {
            // console.log("In validation", registerRoute)
            const { password, email, username } = values
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password,
            })
            if (data.status === false) {
                toast.error(data.msg, toastOptions)
            }
            if (data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                navigate("/")
            }
        }
    }

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    }

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/')
        }
    }, [])

    const handleValidation = () => {
        const { password, confirmPassword, email, username } = values
        if (password !== confirmPassword) {
            toast.error("Mật khẩu không khớp!", toastOptions)
            return false
        }
        else if (username.length < 3) {
            toast.error("Tên tài khoản cần tối thiểu 3 kí tự!", toastOptions)
            return false
        }
        // else if (password.length < 8) {
        //     toast.error("Mật khẩu cần tối thiểu 8 ký tự, ít nhất 1 chữ cái, 1 số và 1 ký tự đặc biệt", toastOptions)
        //     return false
        // }
        else if (email === "") {
            toast.error("Email không được để trống!", toastOptions)
            return false
        }
        return true
    }


    // { ...values, [event.target.name]: event.target.value }: Sử dụng cú pháp "spread operator" ({ ...values }) để tạo một bản sao của state values hiện tại.
    // [event.target.name]: event.target.value: Thêm hoặc cập nhật giá trị của trường có tên là event.target.name trong bản sao này bằng giá trị mới event.target.value.
    // setValues: Sử dụng hook setValues để cập nhật state values với đối tượng mới vừa được tạo.
    // Khi setValues được gọi, React sẽ tự động re-render component với state mới, làm cho giao diện hiển thị được cập nhật theo giá trị mới của các trường nhập liệu.
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h1 className='text-white uppercase'>StormyGram</h1>
                    </div>

                    <input type="text" placeholder='Tên tài khoản' name='username' onChange={(e) => handleChange(e)} />

                    <input type="email" placeholder='Email' name='email' onChange={(e) => handleChange(e)} />

                    <div className='flex relative  items-center'>
                        <input type={isShowPassword ? 'text' : 'password'} placeholder='Mật khẩu' name='password' onChange={(e) => handleChange(e)} />

                        <button
                        type="button"
                        onClick={handleTogglePassword}
                        className="text-xl absolute inset-y-0 right-3 text-white"
                        aria-label={isShowPassword ? 'Hide password' : 'Show password'}
                        >
                        {isShowPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
                        </button>
                    </div>

                    <div className='flex relative  items-center'>
                        <input type={isConfirmPassword ? 'text' : 'password'} placeholder='Xác nhận mật khẩu' name='confirmPassword' onChange={(e) => handleChange(e)} />

                        <button
                        type="button"
                        onClick={handleToggleConfirmPassword}
                        className="text-xl absolute inset-y-0 right-3 text-white"
                        aria-label={isConfirmPassword ? 'Hide password' : 'Show password'}
                        >
                        {isConfirmPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
                        </button>
                    </div>

                    <button className='register-button' style={{backgroundColor:'#4e0eff'}} type='submit'>Đăng Kí</button>

                    <span>Đã có tài khoản ? <Link to="/login">Đăng Nhập</Link></span>

                </form>
            </FormContainer>

            <ToastContainer />
        </>
    )
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
    align-items: center;
    background-color: #131324;

    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 2rem;
        }
        h1 {
            color: white;
            text-transform: uppercase;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 30px;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 2rem 5rem;
    }

    input {
        background-color: transparent;
        padding: 20px;
        border: 0.1rem solid #4e0eff;
        border-radius: 0.4rem;
        color: white;
        width: 100%;
        font-size: 1rem;
        &:focus {
            border: 0.1rem solid #997af0;
            outline: none;
        }
    }

    .register-button {
        background-color: #4e0eff;
        color: white;
        padding: 15px;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        &:hover {
            background-color: #4e0eff;
        }
    }
    
    span {
        color: white;
        text-transform: uppercase;
        
        a {
            color: #4e0eff;
            text-decoration: none;
            font-weight: bold;
        }    
    }
`

export default Register