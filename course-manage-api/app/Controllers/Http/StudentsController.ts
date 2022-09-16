import Student from 'App/Models/Student'
import { STUDENT_ID } from 'App/Utils/constants'
import StudentValidator from 'App/Validators/StudentValidator'
import CrudController from './CrudController'

export default class StudentsController extends CrudController {
  constructor() {
    super(STUDENT_ID, Student, StudentValidator)
  }
}
