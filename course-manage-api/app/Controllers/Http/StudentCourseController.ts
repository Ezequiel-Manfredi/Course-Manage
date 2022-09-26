import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Course from 'App/Models/Course'
import StudentCourse from 'App/Models/StudentCourse'
import SubjectStudent from 'App/Models/SubjectStudent'
import { COURSE_ID, DELETE_OBJECT } from 'App/Utils/constants'
import StudentCourseValidator from 'App/Validators/StudentCourseValidator'

export default class StudentCoursesController {
  public async index({ request, response }: HttpContextContract): Promise<void> {
    const courseId: number = request.param(COURSE_ID)
    const course = await Course.query()
      .where('id', courseId)
      .preload('students', (query) => {
        query.pivotColumns(['absence_count', 'attendance_count', 'class_count']).orderBy('gender')
      })
      .withCount('students')
      .firstOrFail()

    response.ok({ total: parseInt(course.$extras.students_count), result: course.students })
  }

  public async store({ request, response }: HttpContextContract): Promise<void> {
    const id: number = request.param(COURSE_ID)
    request.updateBody({ ...request.body(), courseId: id })
    const { studentsId, courseId } = await request.validate(StudentCourseValidator)

    // creo la relacion estudiante-curso y le agrego las materias los estudiantes
    const list = studentsId.map(async (studentId: number) => {
      await StudentCourse.firstOrCreate({ courseId, studentId })

      const course = await Course.query().where('id', courseId).preload('professors').firstOrFail()

      const list = course.professors.map(async ({ subjectId }) => {
        await SubjectStudent.firstOrCreate({ courseId, studentId, subjectId })
      })
      await Promise.all(list)
    })
    const students = await Promise.all(list)

    response.ok(students)
  }

  public async destroy({ request, response }: HttpContextContract): Promise<void> {
    const { studentId, courseId } = request.params()
    const relationship = await StudentCourse.query()
      .where('course_id', courseId)
      .andWhere('student_id', studentId)
      .firstOrFail()

    await relationship.merge(DELETE_OBJECT).save()

    response.ok(null)
  }
}
