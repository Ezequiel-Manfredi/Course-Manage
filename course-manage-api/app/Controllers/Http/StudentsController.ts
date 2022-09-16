import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Documentation from 'App/Models/Documentation'
import Student from 'App/Models/Student'
import { STUDENT_ID } from 'App/Utils/constants'
import StudentValidator from 'App/Validators/StudentValidator'
import CrudController from './CrudController'

export default class StudentsController extends CrudController {
  constructor() {
    super(STUDENT_ID, Student, StudentValidator)
  }

  public async show({ request, response }: HttpContextContract): Promise<void> {
    const id: number = request.param(this.idName)

    const row = await Student.query().where('id', id).preload('documentation').firstOrFail()

    response.ok(row)
  }

  public async store(ctx: HttpContextContract): Promise<any> {
    const student: Student = await super.store(ctx)

    await Documentation.create({ studentId: student.id })
  }
}
