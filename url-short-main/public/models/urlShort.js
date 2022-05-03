const { default: mongoose } = require("mongoose")
const Mongoose = require ("mongoose")
const{ nanoid } = require ("nanoid")

const UserSchema = new Mongoose.Schema ({
    username: {
        type: String, 
        required: true, 
    },
    email: {
        type: String, 

    },
    password: { 
        type:String,
    }

})
module.exports = mongoose.model("User", UserSchema)

const urlSchortSchema = new Mongoose.Schema ({
    long: {
        type: String, 
        required: true
    }, 
    short: {
        type: String, 
        required: true, 
        default: () => nanoid(5)
    },
    accessCount: {
        type: Number,
        required: true, 
        default: 0
    },
    shortCount: {
        type: Number, 
        required: true,
        default: 1
    }
})

module.exports = mongoose.model("UrlShort", urlSchortSchema)