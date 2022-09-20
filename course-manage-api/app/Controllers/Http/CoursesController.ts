import Course from 'App/Models/Course'
import { COURSE_ID } from 'App/Utils/constants'
import CourseValidator from 'App/Validators/CourseValidator'
import CrudController from './CrudController'

export default class CoursesController extends CrudController {
  constructor() {
    super(COURSE_ID, Course, CourseValidator)
  }
}
