// Đây là một hàm xử lý được import từ file userController, chủ yếu để xử lý logic đăng ký người dùng.
const {addMessage,getAllMessage} = require("../controllers/messagesController");

// router: Đây là một đối tượng router từ Express, được sử dụng để xử lý các định tuyến (routes).
const router = require("express").Router();

// router.post("/addmsg", addMessage): Định nghĩa một định tuyến (route) cho phương thức HTTP POST 
// trên đường dẫn "/addmsg". Khi có một yêu cầu POST được gửi đến địa chỉ này, nó sẽ gọi hàm addmsg từ userController để xử lý yêu cầu.
router.post("/addmsg/", addMessage);
router.post("/getmsg/", getAllMessage);



// Xuất đối tượng router để có thể sử dụng nó ở nơi khác trong ứng dụng.
module.exports = router