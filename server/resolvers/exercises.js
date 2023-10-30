import Exercise from '../models/Exercise.js'

export default {
  Query: {
    async getExercises() {
      try {
        const exercises = await Exercise.find()
        return exercises
      } catch (error) {
        throw new Error(error)
      }
    },
  },
}
