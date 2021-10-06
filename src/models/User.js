import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    id_streamlabs_account: {
        type: String,
        unique: true
    },
    access_token: {
        type: String, 
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    }
},{
    timestamps: true,
    versionKey: false
})

userSchema.statics.encryptToken = async(token) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(token, salt)
}

userSchema.statics.compareToken = async(token, receivedToken) => {
    return await bcrypt.compare(token,receivedToken)
}

export default model('User',userSchema)
