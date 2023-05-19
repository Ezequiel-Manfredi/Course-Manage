import { ENDPOINT, METHOD } from '../utils/constants'
import { apiCall } from './apiCall'

export function getCourses(callback, page, size, schoolId, login) {
  apiCall({
    endpoit: ENDPOINT.COURSES.OF_SCHOOL(schoolId, page, size),
    method: METHOD.GET,
    login
  }).then(callback)
}

export function createCourse(callback, body, login) {
  apiCall({ endpoit: ENDPOINT.COURSES.MAIN, method: METHOD.POST, body, login })
    .then(callback)
}
