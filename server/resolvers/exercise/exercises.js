import Exercise from '../../models/Exercise.js'
import checkAuth from '../../util/check-auth.js'

export default {
  Query: {
    // Get all exercises
    async getExercises() {
      try {
        const exercises = await Exercise.find().sort({ name: 1 })
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
    //Create an exercise
    async createExercise(
      _,
      { exerciseInputs: { name, bodyPart, category } },
      context
    ) {
      // Check uf user is login
      const user = checkAuth(context)

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

    // Delete exercise
    async deleteExercise(_, { exerciseId }, context) {
      // Check uf user is login
      const user = checkAuth(context)
      console.log(user)
      try {
        const exercise = await Exercise.findById(exerciseId)
        if (exercise) {
          await exercise.deleteOne()

          return 'Exercise deleted successfully'
        } else {
          throw new Error('Exercise not found')
        }
      } catch (error) {
        throw new Error(error)
      }
    },
  },
}
