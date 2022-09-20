import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CourseValidator {
  constructor(protected ctx: HttpContextContract) {
    const method = ctx.request.method()

    this.schema = this.options[method]
  }

  public schema: any

  public create = schema.create({
    name: schema.string(),
    preceptorId: schema.number(),
    schoolId: schema.number(),
  })

  public modify = schema.create({
    name: schema.string.optional(),
    preceptorId: schema.number.optional(),
    schoolId: schema.number.optional(),
  })

  private options = {
    POST: this.create,
    PUT: this.modify,
  }

  public messages: CustomMessages = {
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
  }
}
