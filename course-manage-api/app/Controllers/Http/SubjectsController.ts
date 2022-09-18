import Subject from 'App/Models/Subject'
import { SUBJECT_ID } from 'App/Utils/constants'
import SubjectValidator from 'App/Validators/SubjectValidator'
import CrudController from './CrudController'

export default class SubjectsController extends CrudController {
  constructor() {
    super(SUBJECT_ID, Subject, SubjectValidator)
  }
}
