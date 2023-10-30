import { model, Schema } from 'mongoose'

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  createdAt: String,
  personalInformation: {
    weight: String,
    hight: String,
    age: String,
  },
})

export default model('User', userSchema)
