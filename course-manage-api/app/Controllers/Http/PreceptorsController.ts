import Preceptor from 'App/Models/Preceptor'
import { PRECEPTOR_ID } from 'App/Utils/constants'
import PreceptorValidator from 'App/Validators/PreceptorValidator'
import CrudController from './CrudController'

export default class PreceptorsController extends CrudController {
  constructor() {
    super(PRECEPTOR_ID, Preceptor, PreceptorValidator)
  }
}
