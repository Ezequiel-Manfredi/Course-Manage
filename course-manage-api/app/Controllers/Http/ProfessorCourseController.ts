import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Course from 'App/Models/Course'
import ProfessorCourse from 'App/Models/ProfessorCourse'
import { COURSE_ID } from 'App/Utils/constants'
import ProfessorCourseValidator from 'App/Validators/ProfessorCourseValidator'

export default class ProfessorCoursesController {
  public async index({ request, response }: HttpContextContract): Promise<void> {
    const courseId: number = request.param(COURSE_ID)
    const course = await Course.query()
      .where('id', courseId)
      .preload('professors')
      .withCount('professors')
      .firstOrFail()

    response.ok({ total: parseInt(course.$extras.professors_count), result: course.professors })
  }

  public async store({ request, response }: HttpContextContract): Promise<void> {
    const id: number = request.param(COURSE_ID)
    request.updateBody({ ...request.body(), courseId: id })
    const { professorsId, courseId } = await request.validate(ProfessorCourseValidator)

    const list = professorsId.map(
      async (professorId: number) => await ProfessorCourse.firstOrCreate({ courseId, professorId })
    )
    const professors = await Promise.all(list)

    response.ok(professors)
  }

  public async destroy({ request, response }: HttpContextContract): Promise<void> {
    const { courseId, professorId } = request.params()
    const relationship = await ProfessorCourse.query()
      .where('course_id', courseId)
      .andWhere('professor_id', professorId)
      .firstOrFail()

    await relationship.delete()

    response.ok(null)
  }
}
