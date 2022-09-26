import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SubjectStudent from 'App/Models/SubjectStudent'
import SubjectStudentValidator from 'App/Validators/SubjectStudentValidator'

export default class SubjectStudentController {
  public async index({ request, response }: HttpContextContract): Promise<void> {
    const { courseId, studentId } = request.params()

    const subjects = await SubjectStudent.query()
      .where('course_id', courseId)
      .andWhere('student_id', studentId)

    response.ok({ total: subjects.length, result: subjects })
  }

  public async update({ request, response }: HttpContextContract): Promise<void> {
    const { courseId, studentId, subjectId } = request.params()
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
