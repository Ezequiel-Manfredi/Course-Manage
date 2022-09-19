import School from 'App/Models/School'
import { SCHOOL_ID } from 'App/Utils/constants'
import SchoolValidator from 'App/Validators/SchoolValidator'
import CrudController from './CrudController'

export default class SchoolsController extends CrudController {
  constructor() {
    super(SCHOOL_ID, School, SchoolValidator)
  }
}
