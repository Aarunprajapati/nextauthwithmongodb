import mongoose from 'mongoose'
import { type } from 'os'


const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'please enter your username'],
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: [true, 'please enter your email'],
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'please enter your password'],
        },
        isVerifyed: {
            type: Boolean,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        verifyToken: String,
        verifyTokenExpiry: Date,
        forgotPasswordToken: String,
        forgotPasswordTokenExpiry: Date,
    },
    {
        timestamps: true,
    }
)


export const User = mongoose.models.users || mongoose.model('users', userSchema)