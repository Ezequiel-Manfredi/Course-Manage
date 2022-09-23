import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AttendanceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    courseId: schema.number([rules.exists({ table: 'courses', column: 'id' })]),
    students: schema.array().members(schema.number([rules.exists({ table: 'students', column: 'id' })])),
    date: schema.date.optional({ format: 'yyyy-MM-dd' }),
  })

  public messages: CustomMessages = {
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
  }
}
