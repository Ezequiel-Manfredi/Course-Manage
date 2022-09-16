import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Gender } from 'App/Utils/constants'

export default class StudentValidator {
  constructor(protected ctx: HttpContextContract) {
    const method = ctx.request.method()

    this.schema = this.options[method]
  }

  public schema: any

  public create = schema.create({
    firstName: schema.string(),
    middleName: schema.string.optional(),
    lastName: schema.string(),
    gender: schema.enum(Object.values(Gender)),
    dni: schema.number.optional(),
    cuil: schema.number.optional(),
    address: schema.string.optional(),
    phoneNumber: schema.string.optional(),
    birthDate: schema.date({ format: 'yyyy-MM-dd' }),
    fileNumber: schema.number(),
    annotations: schema.string.optional(),
  })

  public modify = schema.create({
    firstName: schema.string.optional(),
    middleName: schema.string.optional(),
    lastName: schema.string.optional(),
    gender: schema.enum.optional(Object.values(Gender)),
    dni: schema.number.optional(),
    cuil: schema.number.optional(),
    address: schema.string.optional(),
    phoneNumber: schema.string.optional(),
    birthDate: schema.date.optional({ format: 'yyyy-MM-dd' }),
    fileNumber: schema.number.optional(),
    annotations: schema.string.optional(),
  })

  private options = {
    POST: this.create,
    PUT: this.modify,
  }

  public messages: CustomMessages = {
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
    'role.enum': 'The value must be one of {{ options.choices }}',
  }
}
