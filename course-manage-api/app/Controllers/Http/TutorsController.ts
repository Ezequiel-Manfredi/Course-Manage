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

  public async show(ctx: HttpContextContract): Promise<void> {
    await this.verifyIds(ctx)

    await super.show(ctx)
  }

  public async update(ctx: HttpContextContract): Promise<void> {
    await this.verifyIds(ctx)

    await super.update(ctx)
  }

  public async verifyIds(ctx: HttpContextContract) {
    const studentId: number = ctx.request.param(STUDENT_ID)
    const tutorId: number = ctx.request.param(TUTOR_ID)
    await TutorStudent.query().where('student_id', studentId).andWhere('tutor_id', tutorId).firstOrFail()
  }
}
