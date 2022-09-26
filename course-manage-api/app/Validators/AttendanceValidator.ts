import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DATE_FORMAT } from 'App/Utils/constants'

export default class AttendanceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    courseId: schema.number([rules.exists({ table: 'courses', column: 'id' })]),
    students: schema.array().members(schema.number([rules.exists({ table: 'students', column: 'id' })])),
    date: schema.date.optional({ format: DATE_FORMAT }, [rules.beforeOrEqual('today')]),
  })

  public messages: CustomMessages = {
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
  }
}
