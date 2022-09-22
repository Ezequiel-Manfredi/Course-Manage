import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Attendance from 'App/Models/Attendance'
import Course from 'App/Models/Course'
import { ATTENDANCE_ID, COURSE_ID, DEFAULT_PAGE, DEFAULT_SIZE } from 'App/Utils/constants'
import PaginationValidator from 'App/Validators/PaginationValidator'
import AttendanceValidator from 'App/Validators/AttendanceValidator'

export default class AttendancesController {
  public async index({ request, response }: HttpContextContract): Promise<void> {
    const courseId: number = request.param(COURSE_ID)
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = await request.validate(PaginationValidator)

    const course = await Course.query()
      .where('id', courseId)
      .preload('attendaces', (query) => {
        query.paginate(page, size)
      })
      .withCount('attendaces')
      .firstOrFail()

    response.ok({ total: course.$extras.attendances_count, result: course.attendaces })
  }

  public async store({ request, response }: HttpContextContract): Promise<void> {
    const courseId: number = request.param(COURSE_ID)
    request.updateBody({ ...request.body(), courseId })
    const { students, date } = await request.validate(AttendanceValidator)

    const setStudents = [...new Set(students)]
    const attendance = await Attendance.create({ courseId, date, record: setStudents })

    response.ok(attendance)
  }

  public async destroy({ request, response }: HttpContextContract): Promise<void> {
    const courseId: number = request.param(COURSE_ID)
    const attendanceId: number = request.param(ATTENDANCE_ID)
    const attendance = await Attendance.query()
      .where('course_id', courseId)
      .andWhere('attendance_id', attendanceId)
      .firstOrFail()

    await attendance.delete()

    response.ok(null)
  }
}
