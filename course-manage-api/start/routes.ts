/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import { PRECEPTOR_ID, STUDENT_ID, TUTOR_ID, USER_ID } from 'App/Utils/constants'

Route.resource('users', 'UsersController')
  .apiOnly()
  .paramFor('users', USER_ID)
  .where(USER_ID, Route.matchers.number())

Route.resource('preceptors', 'PreceptorsController')
  .apiOnly()
  .paramFor('preceptors', PRECEPTOR_ID)
  .where(PRECEPTOR_ID, Route.matchers.number())

Route.resource('students', 'StudentsController')
  .apiOnly()
  .paramFor('students', STUDENT_ID)
  .where(STUDENT_ID, Route.matchers.number())

Route.resource('students.tutors', 'TutorsController')
  .apiOnly()
  .paramFor('students', STUDENT_ID)
  .paramFor('tutors', TUTOR_ID)
  .where(STUDENT_ID, Route.matchers.number())
  .where(TUTOR_ID, Route.matchers.number())

Route.put(`/students/:${STUDENT_ID}/documentation`, 'DocumentationsController.update').where(
  STUDENT_ID,
  Route.matchers.number()
)
