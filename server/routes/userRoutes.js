// Đây là một hàm xử lý được import từ file userController, chủ yếu để xử lý logic đăng ký người dùng.
const { register, login, setAvatar } = require("../controllers/userController")

// router: Đây là một đối tượng router từ Express, được sử dụng để xử lý các định tuyến (routes).
const router = require("express").Router()

// router.post("/register", register): Định nghĩa một định tuyến (route) cho phương thức HTTP POST 
// trên đường dẫn "/register". Khi có một yêu cầu POST được gửi đến địa chỉ này, nó sẽ gọi hàm register từ userController để xử lý yêu cầu.
router.post("/register", register)
router.post("/login", login)
router.post("/setAvatar/:id", setAvatar)


// Xuất đối tượng router để có thể sử dụng nó ở nơi khác trong ứng dụng.
module.exports = router