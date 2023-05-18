import { NULL_VALUE } from './constants'

export default function checkRedirection(login, pathExcept, pathAllow, navigator) {
  // INTENTAR MEJORAR
  if (login) {
    if (login.user.preceptor) {
      if (!pathAllow.some((regex) => regex.test(location.pathname))) {
        navigator('/courses') // path no permitido
      } else {
        return NULL_VALUE // path permitido
      }
    } else if (location.pathname !== '/create-preceptor') {
      navigator('/create-preceptor') // path cualquiera
    }
  } else {
    if (!pathExcept.some((regex) => regex.test(location.pathname))) {
      navigator('/login') // path cualquiera exepto
    } else {
      return NULL_VALUE // path exepto
    }
  }
}
