import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DocumentationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    birthCertificate: schema.boolean.optional(),
    seventhGradeCertificate: schema.boolean.optional(),
    studentDni: schema.boolean.optional(),
    studentCuil: schema.boolean.optional(),
    tutorDni: schema.boolean.optional(),
    tutorCuil: schema.boolean.optional(),
    vaccinationCard: schema.boolean.optional(),
    studentDomicileCertificate: schema.boolean.optional(),
    tutorDomicileCertificate: schema.boolean.optional(),
    registrationRequest: schema.boolean.optional(),
    physicalAptitude: schema.boolean.optional(),
    dental: schema.boolean.optional(),
  })

  public messages: CustomMessages = {
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
  }
}
