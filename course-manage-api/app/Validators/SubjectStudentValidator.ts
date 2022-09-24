import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SubjectStudentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    firstQuarter: schema.string.optional(),
    secondQuarter: schema.string.optional(),
    december: schema.string.optional(),
    march: schema.string.optional(),
    passed: schema.boolean.optional(),
    annotations: schema.string.optional(),
  })

  public messages: CustomMessages = {
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
  }
}
