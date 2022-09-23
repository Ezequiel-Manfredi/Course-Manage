import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Attendance from 'App/Models/Attendance'
import { ATTENDANCE_ID, COURSE_ID, DEFAULT_PAGE, DEFAULT_SIZE } from 'App/Utils/constants'
import PaginationValidator from 'App/Validators/PaginationValidator'
import AttendanceValidator from 'App/Validators/AttendanceValidator'
import StudentCourse from 'App/Models/StudentCourse'

export default class AttendancesController {
  public async index({ request, response }: HttpContextContract): Promise<void> {
    const courseId: number = request.param(COURSE_ID)
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = await request.validate(PaginationValidator)

    const attendances = await Attendance.query().where('course_id', courseId).paginate(page, size)

    response.ok({ total: attendances.total, result: attendances.all() })
  }

  public async store({ request, response }: HttpContextContract): Promise<void> {
    const courseId: number = request.param(COURSE_ID)
    request.updateBody({ ...request.body(), courseId })
    const { students, date } = await request.validate(AttendanceValidator)

    const setStudents = [...new Set(students)]
    const attendance = await Attendance.create({ courseId, date, record: { students: setStudents } })

    response.ok(attendance)

    const studentCourse = await StudentCourse.query().where('course_id', courseId)
    studentCourse.forEach(async (relationship) => {
      if (setStudents.includes(relationship.studentId)) {
        relationship.attendanceCount++
      } else {
        relationship.absenceCount++
      }
      relationship.classCount++
      await relationship.save()
    })
  }

  public async destroy({ request, response }: HttpContextContract): Promise<void> {
    const courseId: number = request.param(COURSE_ID)
    const attendanceId: number = request.param(ATTENDANCE_ID)
    const attendance = await Attendance.query()
      .where('course_id', courseId)
      .andWhere('id', attendanceId)
      .firstOrFail()

    const studentCourse = await StudentCourse.query().where('course_id', courseId)
    studentCourse.forEach(async (relationship) => {
      if (attendance.record.students.includes(relationship.studentId)) {
        relationship.attendanceCount--
      } else {
        relationship.absenceCount--
      }
      relationship.classCount--
      await relationship.save()
    })

    await attendance.delete()

    response.ok(null)
  }
}
