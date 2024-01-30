// express: Module để xây dựng ứng dụng web và xử lý các yêu cầu HTTP.
const express = require("express")

// cors: Module cho phép các yêu cầu HTTP từ các domain khác có thể được chấp nhận.
const cors = require("cors")

// mongoose: Thư viện để tương tác với MongoDB từ Node.js
const mongoose = require("mongoose")

const userRoutes = require("./routes/userRoutes")

// Tạo một ứng dụng Express để xử lý các yêu cầu HTTP.
const app  = express();

require("dotenv").config()

// cors(): Middleware cho phép Cross-Origin Resource Sharing (CORS), giúp giải quyết vấn đề về an toàn giao thức truy cập từ các domain khác.
app.use(cors())

// express.json(): Middleware để xử lý dữ liệu JSON từ các yêu cầu.
app.use(express.json())

app.use("/api/auth", userRoutes)

// Sử dụng mongoose để kết nối đến cơ sở dữ liệu MongoDB, sử dụng các tùy chọn useNewUrlParser và useUnifiedTopology.
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Database Connection Successfully")
}).catch((err) => {
    console.log("Database Connection Error:", err);
    
});

// Tạo một máy chủ và lắng nghe trên cổng được đặt trong biến môi trường PORT.
const server = app.listen(process.env.PORT, ()=> {
    console.log(`Server started on PORT : ${process.env.PORT}`)
})