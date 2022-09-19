import Professor from 'App/Models/Professor'
import { PROFESSOR_ID } from 'App/Utils/constants'
import ProfessorValidator from 'App/Validators/ProfessorValidator'
import CrudController from './CrudController'

export default class ProfessorsController extends CrudController {
  constructor() {
    super(PROFESSOR_ID, Professor, ProfessorValidator)
  }
}
