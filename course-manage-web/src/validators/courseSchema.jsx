import { object, string } from 'yup'
import { YEAR_REGEX } from '../utils/constants'

export const courseSchema = object().shape({
  name: string().required(),
  createdAt: string().matches(YEAR_REGEX).optional()
})
