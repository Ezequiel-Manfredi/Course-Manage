import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SubjectStudent from 'App/Models/SubjectStudent'
import { COURSE_ID, STUDENT_ID, SUBJECT_ID } from 'App/Utils/constants'
import SubjectStudentValidator from 'App/Validators/SubjectStudentValidator'

export default class SubjectStudentController {
  public async index({ request, response }: HttpContextContract) {
    const courseId = request.param(COURSE_ID)
    const studentId = request.param(STUDENT_ID)

    const subjects = await SubjectStudent.query()
      .where('course_id', courseId)
      .andWhere('student_id', studentId)

    response.ok({ total: subjects.length, result: subjects })
  }

  public async update({ request, response }: HttpContextContract) {
    const courseId = request.param(COURSE_ID)
    const studentId = request.param(STUDENT_ID)
    const subjectId = request.param(SUBJECT_ID)
    const body = await request.validate(SubjectStudentValidator)

    const subject = await SubjectStudent.query()
      .where('course_id', courseId)
      .andWhere('student_id', studentId)
      .andWhere('subjectId', subjectId)
      .firstOrFail()

    await subject.merge(body).save()

    response.ok(subject)
  }
}
