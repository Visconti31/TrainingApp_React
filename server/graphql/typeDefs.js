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

  # Queries
  type Query {
    getExercises: [Exercise]
  }

  # Mutations
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInputs: LoginInputs): User!
  }
`

export default typeDefs
