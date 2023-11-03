import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserInputError } from 'apollo-server'

import { SECRET_KEY } from '../config.js'
import User from '../models/User.js'
import {
  validateRegisterInputs,
  validateLoginInputs,
} from '../util/validators.js'

export default {
  Mutation: {
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

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      })

      const res = await newUser.save()

      // Create an auth token
      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        SECRET_KEY,
        { expiresIn: '1h' }
      )

      return {
        ...res._doc,
        id: res._id,
        token,
      }
    },
  },
}
