import { object, string, number } from 'yup'

export const preceptorSchema = object().shape({
  firstName: string().matches(/^[A-Za-z ]*$/).required(),
  middleName: string().matches(/^[A-Za-z ]*$/).optional(),
  lastName: string().matches(/^[A-Za-z ]*$/).required(),
  userId: number().positive().required()
})
