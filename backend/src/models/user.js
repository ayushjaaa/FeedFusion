import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

}, { timestamps: true });

export default mongoose.model("User", userSchema);


userSchema.pre("save",async function (next) {
    if( !this.isModified("password")) return next()
        this.password= await bcrypt.hash(this.password,10)
    next( )
})
userSchema.method.comaprepassword = async function () {
    return bcrypt.compare(password,this.password)
}