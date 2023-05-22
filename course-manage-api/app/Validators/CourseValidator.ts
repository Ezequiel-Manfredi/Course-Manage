import { schema, rules, validator, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DATE_FORMAT } from 'App/Utils/constants'

export class CourseValidator {
  constructor(protected ctx: HttpContextContract) {
    const method = ctx.request.method()

    this.schema = this.options[method]
  }

  public schema: any

  public create = schema.create({
    name: schema.string(),
    preceptorId: schema.number([rules.exists({ table: 'preceptors', column: 'id' })]),
    schoolId: schema.number([rules.exists({ table: 'schools', column: 'id' })]),
    createdAt: schema.date.optional({ format: DATE_FORMAT }),
  })

  public modify = schema.create({
    name: schema.string.optional(),
    preceptorId: schema.number.optional([rules.exists({ table: 'preceptors', column: 'id' })]),
    schoolId: schema.number.optional([rules.exists({ table: 'schools', column: 'id' })]),
    createdAt: schema.date.optional({ format: DATE_FORMAT }),
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

export class QueryCourseValidator {
  constructor(protected ctx: HttpContextContract) {
    const parseEntries = Object.entries(ctx.request.qs()).map(([key, value]) => [key, parseInt(value)])
    this.data = Object.fromEntries(parseEntries)
  }

  public data: { school?: any; page?: any; size?: any } = {}
  private schema = schema.create({
    school: schema.number([rules.exists({ table: 'schools', column: 'id' })]),
    page: schema.number.optional([rules.unsigned()]),
    size: schema.number.optional([rules.unsigned()]),
  })

  public async validate() {
    await validator.validate({ data: this.data, schema: this.schema })
  }
}
