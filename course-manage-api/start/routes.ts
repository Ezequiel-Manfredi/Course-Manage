import Route from '@ioc:Adonis/Core/Route'
import { STUDENT_ID } from 'App/Utils/constants'
import { routeData } from './routeData'

routeData.forEach(({ route, idName, controller, callBack }) => {
  let router = Route.resource(route, controller)
    .apiOnly()
    .middleware({
      '*': ['auth'],
    })
  const subroutes = route.split('.')

  router = subroutes.reduce((router, subroute, index) => {
    return router.paramFor(subroute, idName[index]).where(idName[index], Route.matchers.number())
  }, router)

  if (callBack) callBack(router)
})

Route.put(`/students/:${STUDENT_ID}/documentation`, 'DocumentationsController.update')
  .where(STUDENT_ID, Route.matchers.number())
  .middleware('auth')

Route.post('/login', 'AuthenticationController.login')
Route.post('/logout', 'AuthenticationController.logout').middleware('auth')
