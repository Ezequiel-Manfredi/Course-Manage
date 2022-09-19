import {
  PRECEPTOR_ID,
  PROFESSOR_ID,
  SCHOOL_ID,
  STUDENT_ID,
  SUBJECT_ID,
  TUTOR_ID,
  USER_ID,
} from 'App/Utils/constants'

export const routeData = [
  {
    route: 'users',
    idName: [USER_ID],
    controller: 'UsersController',
  },
  {
    route: 'preceptors',
    idName: [PRECEPTOR_ID],
    controller: 'PreceptorsController',
  },
  {
    route: 'students',
    idName: [STUDENT_ID],
    controller: 'StudentsController',
  },
  {
    route: 'students.tutors',
    idName: [STUDENT_ID, TUTOR_ID],
    controller: 'TutorsController',
  },
  {
    route: 'subjects',
    idName: [SUBJECT_ID],
    controller: 'SubjectsController',
    callBack: (router: any) => {
      router.except(['update'])
    },
  },
  {
    route: 'professors',
    idName: [PROFESSOR_ID],
    controller: 'ProfessorsController',
  },
  {
    route: 'schools',
    idName: [SCHOOL_ID],
    controller: 'SchoolsController',
    callBack: (router: any) => {
      router.except(['update'])
    },
  },
]
