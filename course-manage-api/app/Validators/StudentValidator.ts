import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CUIL_REGEX, DATE_FORMAT, DNI_REGEX, Gender } from 'App/Utils/constants'

export default class StudentValidator {
  constructor(protected ctx: HttpContextContract) {
    const method = ctx.request.method()

    this.schema = this.options[method]
  }

  public schema: any

  private base = {
    middleName: schema.string.optional([rules.alpha({ allow: ['space'] })]),
    dni: schema.string.optional([rules.regex(DNI_REGEX)]),
    cuil: schema.string.optional([rules.regex(CUIL_REGEX)]),
    address: schema.string.optional(),
    phoneNumber: schema.string.optional([rules.mobile({ locale: ['es-AR'] })]),
    annotations: schema.string.optional(),
  }

  public create = schema.create({
    ...this.base,
    firstName: schema.string([rules.alpha({ allow: ['space'] })]),
    lastName: schema.string([rules.alpha({ allow: ['space'] })]),
    gender: schema.enum(Object.values(Gender)),
    birthDate: schema.date({ format: DATE_FORMAT }, [rules.before('today')]),
    fileNumber: schema.number([rules.unique({ table: 'students', column: 'file_number' }), rules.unsigned()]),
  })

  public modify = schema.create({
    ...this.base,
    firstName: schema.string.optional([rules.alpha({ allow: ['space'] })]),
    lastName: schema.string.optional([rules.alpha({ allow: ['space'] })]),
    gender: schema.enum.optional(Object.values(Gender)),
    birthDate: schema.date.optional({ format: DATE_FORMAT }, [rules.before('today')]),
    fileNumber: schema.number.optional([
      rules.unique({ table: 'students', column: 'file_number' }),
      rules.unsigned(),
    ]),
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
