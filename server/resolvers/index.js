import exerciseResolvers from './exercise/exercises.js'
import userResolvers from './users/users.js'

export default {
  Query: {
    ...exerciseResolvers.Query,
  },

  Mutation: {
    ...userResolvers.Mutation,
    ...exerciseResolvers.Mutation,
  },
}
