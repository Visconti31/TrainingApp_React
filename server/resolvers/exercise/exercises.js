import Exercise from '../../models/Exercise.js'
import checkAuth from '../../util/check-auth.js'

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

  Mutation: {
    async createExercise(
      _,
      { exerciseInputs: { name, bodyPart, category } },
      context
    ) {
      const user = checkAuth(context)
      console.log(user)

      // Creating new instance of Exercise with the inputs
      const newExercise = new Exercise({
        name,
        bodyPart,
        category,
      })

      // Saving Exercise in DB
      const exercise = await newExercise.save()
      console.log(exercise)
      return exercise
    },
  },
}
