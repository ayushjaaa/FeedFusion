import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from "../config/config.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: true,
        trim: true,
        lowercase: true,
        minLength:[3,'Username must be at least 3 character'],
        maxLength:[15,"Username must be not more then the 15 character"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        trim:true,
        lowercase:true,
        minLength:[3,'Email must be at least 6 character'],
        maxLength:[100,"Email must be not more then the 60 character"]

    },
    profileImage:{
        type:String,
        default:''
    },
    password:{
        type:String,
        minLength:[6,"password mmost be at least 6 character "]
    },
role:{
    type:String,
    enum:['user','admin','superadmin'] , 
    default:'user'
}
,
refreshToken:{
    type: [String],
    default: [],

}
}, { timestamps: true });




userSchema.pre("save", async function (next) {
    if( !this.isModified("password")) return next()
        this.password = await bcrypt.hash(this.password,10)
    next( )
})
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken = function(){
    const token = jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email,
    },config.JWT_REFERESH_SECRET ,{
        expiresIn:config.accessexpiresIn
    })
    return token
}

userSchema.methods.generateRefreshToken = function(){
    const token = jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email
    },config.JWT_access_SECRET,{
        expiresIn:config.accessexpiresIn
    })
    return token
}

export default mongoose.model("User", userSchema);