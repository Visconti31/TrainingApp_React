import { gql } from 'graphql-tag'

const typeDefs = gql`
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

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getExercises: [Exercise]
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
  }
`

export default typeDefs
