import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Documentation from 'App/Models/Documentation'
import { STUDENT_ID } from 'App/Utils/constants'
import DocumentationValidator from 'App/Validators/DocumentationValidator'

export default class DocumentationsController {
  public async update({ request, response }: HttpContextContract): Promise<void> {
    const id: number = request.param(STUDENT_ID)
    const body = await request.validate(DocumentationValidator)

    const documentation = await Documentation.query().where('student_id', id).firstOrFail()
    await documentation.merge(body).save()

    response.ok(documentation)
  }
}
