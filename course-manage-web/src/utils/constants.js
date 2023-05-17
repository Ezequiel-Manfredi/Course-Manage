export const API_URL = 'http://localhost:3333'
export const MINIMUM_PASSWORD_LENGTH = 8
export const MOVILE_SIZE = 800
export const NULL_VALUE = null
export const COURSE = Object.freeze({
  INITIAL_PAGE: 1,
  INITIAL_SIZE: 10
})
export const METHOD = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
})
export const RESPONSE = Object.freeze({
  CREATED: 201,
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401
})
export const STORAGE_KEY = Object.freeze({
  SCHOOL: 'selected_school',
  LOGIN: 'login_data'
})
export const ROUTES = Object.freeze({
  REGISTER: '/register',
  LOGIN: '/login',
  COURSES: '/courses'
})
export const ENDPOINT = Object.freeze({
  LOGIN: '/login',
  LOGOUT: '/logout',
  USERS: Object.freeze({
    MAIN: '/users'
    // ID: function(id) { return `${this.MAIN}/${id}` }
  }),
  PRECEPTORS: Object.freeze({
    MAIN: '/preceptors'
    // ID: function(id) { return `${this.MAIN}/${id}` }
  })
})
