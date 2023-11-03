import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserInputError } from 'apollo-server'

import { SECRET_KEY } from '../../config.js'
import User from '../../models/User.js'
import {
  validateRegisterInputs,
  validateLoginInputs,
} from '../../util/validators.js'

// Helper function to create the token
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  )
}

export default {
  Mutation: {
    //* Login User
    async login(parent, { loginInputs: { email, password } }, context, info) {
      const { valid, errors } = validateLoginInputs(email, password)

      // Checking if the inputs are valid
      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }

      // Checking if the user exist
      const user = await User.findOne({ email })
      if (!user) {
        errors.general = 'User not found'
        throw new UserInputError('Email does not exist', { errors })
      }

      // Checking if the password match the registered password to the user
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        errors.general = 'Wrong password'
        throw new UserInputError('Wrong password', { errors })
      }

      // Create an auth token
      const token = generateToken(user)

      return {
        ...user._doc,
        id: user._id,
        token,
      }
    },

    //* Register User
    async register(
      parent,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // Validate user data
      const { valid, errors } = validateRegisterInputs(
        username,
        email,
        password,
        confirmPassword
      )
      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }

      // Make sure that username is unique
      const userName = await User.findOne({ username })
      if (userName) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken',
          },
        })
      }
      // Make sure that user doesn't exist
      const userEmail = await User.findOne({ email })
      if (userEmail) {
        throw new UserInputError('Email already exist', {
          errors: {
            email: 'Email already exist',
          },
        })
      }

      // Hash the password before saving
      password = await bcrypt.hash(password, 12)

      // Creating new User instance with the inputs
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      })
      // Saving the user in DB
      const res = await newUser.save()

      // Create an auth token
      const token = generateToken(res)

      return {
        ...res._doc,
        id: res._id,
        token,
      }
    },
  },
}
