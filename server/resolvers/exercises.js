import Exercise from '../models/Exercise.js'

export default {
  Query: {
    // Get all exercises
    async getExercises() {
      try {
        const exercises = await Exercise.find()
        return exercises
      } catch (error) {
        throw new Error(error)
      }
    },

    // Get one exercise
    async getExercise(_, { exerciseId }) {
      try {
        const exercise = await Exercise.findById(exerciseId)

        if (exercise) {
          return exercise
        } else {
          throw new Error('Exercise not found')
        }
      } catch (error) {
        throw new Error(error)
      }
    },
  },
}
