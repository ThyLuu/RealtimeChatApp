const mongoose = require("mongoose")

// mongoose.Schema: Hàm tạo một đối tượng Schema trong Mongoose, đại diện cho cấu trúc của một bản ghi trong cơ sở dữ liệu MongoDB.
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: ""
    }
})

// mongoose.model("Users", userSchema): Tạo một model trong Mongoose 
// với tên "Users" và sử dụng Schema đã định nghĩa trước đó. Model này sẽ 
// được sử dụng để tương tác với bảng (collection) "Users" trong cơ sở dữ liệu MongoDB.
module.exports = mongoose.model("Users", userSchema)
