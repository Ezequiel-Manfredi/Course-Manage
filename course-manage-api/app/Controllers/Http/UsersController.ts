import User from 'App/Models/User'
import { USER_ID } from 'App/Utils/constants'
import UserValidator from 'App/Validators/UserValidator'
import CrudController from './CrudController'

export default class UsersController extends CrudController {
  constructor() {
    super(USER_ID, User, UserValidator)
  }
}
