import {body} from "express-validator"
export const registeruserValigation = [
    body('username')
    .isString()
    .withMessage('Usename must be a String')
    .isLength({min:3,max:15})
    .withMessage("Username must be between 3  to 15 character")
  .custom((value)=>value === value.toLowerCase())
    .withMessage("User must le a lowecase"),
    body('email')
    .isEmail()
    .withMessage('Email must be a valid email'),
    body('password')
    .isString()
    .withMessage("password must be a string")
    .isLength({min:6})
    .withMessage("minimun length should be 6")
]