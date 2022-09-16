import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'
import Tutor from 'App/Models/Tutor'
import TutorStudent from 'App/Models/TutorStudent'
import { STUDENT_ID, TUTOR_ID } from 'App/Utils/constants'
import TutorValidator from 'App/Validators/TutorValidator'
import CrudController from './CrudController'

export default class TutorsController extends CrudController {
  constructor() {
    super(TUTOR_ID, Tutor, TutorValidator)
  }

  public async index({ request, response }: HttpContextContract): Promise<void> {
    const studentId: number = request.param(STUDENT_ID)

    const student = await Student.query()
      .where('id', studentId)
      .preload('tutors')
      .withCount('tutors')
      .firstOrFail()

    response.ok({ total: student.$extras.tutors_count, result: student.tutors })
  }

  public async store(ctx: HttpContextContract): Promise<void> {
    const studentId: number = ctx.request.param(STUDENT_ID)

    const student: Student = await Student.findOrFail(studentId)
    const tutor: Tutor = await super.store(ctx)

    await TutorStudent.create({ studentId: student.id, tutorId: tutor.id })
  }
}
