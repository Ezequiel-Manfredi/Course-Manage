import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfessorCourseValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    professorsId: schema
      .array()
      .members(schema.number([rules.exists({ table: 'professors', column: 'id' })])),
    courseId: schema.number([rules.exists({ table: 'courses', column: 'id' })]),
  })

  public messages: CustomMessages = {
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
  }
}
