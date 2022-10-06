export default function checkRedirection(login, pathExcept, pathAllow, navigator) {
  // INTENTAR MEJORAR
  if (login) {
    if (login.user.preceptor) {
      if (!pathAllow.includes(location.pathname)) {
        navigator('/courses') // path no permitido
      } else {
        return undefined // path permitido
      }
    } else if (location.pathname !== '/create-preceptor') {
      navigator('/create-preceptor') // path cualquiera
    }
  } else {
    if (!pathExcept.includes(location.pathname)) {
      navigator('/login') // path cualquiera exepto
    } else {
      return undefined // path exepto
    }
  }
}
