const mongoose = require("mongoose");

// mongoose.Schema: Hàm tạo một đối tượng Schema trong Mongoose, đại diện cho cấu trúc của một bản ghi trong cơ sở dữ liệu MongoDB.
const messageSchema = new mongoose.Schema(
  {
    message: {
      text: { type: String,
      required: true ,},
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);




// mongoose.model("Messages", messageSchema): Tạo một model trong Mongoose 
// với tên "Messages" và sử dụng Schema đã định nghĩa trước đó. Model này sẽ 
// được sử dụng để tương tác với bảng (collection) "Messages" trong cơ sở dữ liệu MongoDB.
module.exports = mongoose.model("Messages", messageSchema);
