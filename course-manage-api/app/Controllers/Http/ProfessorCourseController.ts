import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Course from 'App/Models/Course'
import Professor from 'App/Models/Professor'
import ProfessorCourse from 'App/Models/ProfessorCourse'
import SubjectStudent from 'App/Models/SubjectStudent'
import { COURSE_ID, DELETE_OBJECT } from 'App/Utils/constants'
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

    // creo la relacion profesor-curso y actualizo las nuevas materias a los estudiantes
    const list = professorsId.map(async (professorId: number) => {
      const { subjectId } = await Professor.query().where('id', professorId).firstOrFail()
      const courseProfessor = await ProfessorCourse.firstOrCreate({ courseId, professorId, subjectId })

      const course = await Course.query().where('id', courseId).preload('students').firstOrFail()
      const list = course.students.map(async ({ id }) => {
        await SubjectStudent.firstOrCreate({ courseId, studentId: id, subjectId })
      })
      await Promise.all(list)

      return courseProfessor
    })
    const courseProfessors = await Promise.all(list)

    response.ok(courseProfessors)
  }

  public async destroy({ request, response }: HttpContextContract): Promise<void> {
    const { courseId, professorId } = request.params()
    const relationship = await ProfessorCourse.query()
      .where('course_id', courseId)
      .andWhere('professor_id', professorId)
      .firstOrFail()

    await relationship.merge(DELETE_OBJECT).save()

    response.ok(null)
  }
}
