import { model, Schema } from 'mongoose'

const trainerSchema = new Schema({
  username: String,
  email: String,
  password: String,
  createdAt: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
})

export default model('Trainer', trainerSchema)
