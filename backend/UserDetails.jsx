const mongoose = require("mongoose");

const UserDetailSchema= new mongoose.Schema(
    {
        name: String,
        email:{
            type: String,
            unique: true
        },
        password: String,
        image: String,
        username: String
    },
    {
        collection: "UserInfo",
    }
);
mongoose.model("UserInfo", UserDetailSchema);