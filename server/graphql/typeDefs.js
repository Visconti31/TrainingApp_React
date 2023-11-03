import { gql } from 'graphql-tag'

const typeDefs = gql`
  # Defining types
  type Exercise {
    id: ID!
    name: String!
    bodyPart: String!
    category: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: String!
    token: String!
  }

  # Defining inputs for Mutations
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  input LoginInputs {
    email: String!
    password: String!
  }

  input ExerciseInputs {
    name: String!
    bodyPart: String!
    category: String!
  }

  # Queries
  type Query {
    getExercises: [Exercise]
    getExercise(exerciseId: ID!): Exercise
  }

  # Mutations
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInputs: LoginInputs): User!
    createExercise(exerciseInputs: ExerciseInputs): Exercise!
    deleteExercise(exerciseId: ID!): String!
  }
`

export default typeDefs
