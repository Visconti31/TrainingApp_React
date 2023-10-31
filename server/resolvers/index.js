import exerciseResolvers from './exercises.js'
import userResolvers from './users.js'

export default {
  Query: {
    ...exerciseResolvers.Query,
  },

  Mutation: {
    ...userResolvers.Mutation,
  },
}
