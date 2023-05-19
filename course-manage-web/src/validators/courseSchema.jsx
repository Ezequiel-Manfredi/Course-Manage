import { object, string, number } from 'yup'
import { YEAR_REGEX } from '../utils/constants'

export const courseSchema = object().shape({
  name: string().required(),
  createdAt: string().matches(YEAR_REGEX).optional(),
  preceptorId: number().positive().integer().required(),
  schoolId: number().positive().integer().required()
})
