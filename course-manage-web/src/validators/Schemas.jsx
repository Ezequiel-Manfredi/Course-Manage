import { object, ref, string } from 'yup'
import { MINIMUM_PASSWORD_LENGTH } from '../utils/constants'

export const userSchema = object().shape({
  email: string().email().required(),
  password: string().min(MINIMUM_PASSWORD_LENGTH).required(),
  passwordConfirmation: string().oneOf([ref('password')]),
  role: string().required()
})
