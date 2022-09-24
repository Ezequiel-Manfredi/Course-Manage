import {
  ATTENDANCE_ID,
  COURSE_ID,
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
  {
    route: 'courses',
    idName: [COURSE_ID],
    controller: 'CoursesController',
  },
  {
    route: 'courses.professors',
    idName: [COURSE_ID, PROFESSOR_ID],
    controller: 'ProfessorCourseController',
    callBack: (router: any) => {
      router.only(['index', 'store', 'destroy'])
    },
  },
  {
    route: 'courses.students',
    idName: [COURSE_ID, STUDENT_ID],
    controller: 'StudentCourseController',
    callBack: (router: any) => {
      router.only(['index', 'store', 'destroy'])
    },
  },
  {
    route: 'courses.attendances',
    idName: [COURSE_ID, ATTENDANCE_ID],
    controller: 'AttendancesController',
    callBack: (router: any) => {
      router.except(['update', 'show'])
    },
  },
  {
    route: 'courses.students.subjects',
    idName: [COURSE_ID, STUDENT_ID, SUBJECT_ID],
    controller: 'SubjectStudentController',
    callBack: (router: any) => {
      router.only(['index', 'update'])
    },
  },
]
