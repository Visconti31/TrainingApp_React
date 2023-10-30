import { model, Schema } from 'mongoose'

const exerciseSchema = new Schema({
  name: String,
  bodyPart: String,
  category: String,
})

export default model('Exercise', exerciseSchema)
