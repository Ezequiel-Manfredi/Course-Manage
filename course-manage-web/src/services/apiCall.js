import { API_URL, METHOD, NULL_VALUE, RESPONSE } from '../utils/constants'

export const apiCall = async ({ endpoit, method = METHOD.GET, body = NULL_VALUE, login = {} }) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${login.type} ${login.token}`
    },
    method
  }
  if (body) options.body = JSON.stringify(body)

  const response = await fetch(API_URL + endpoit, options)
  if (response.status === RESPONSE.UNAUTHORIZED) return { status: RESPONSE.UNAUTHORIZED }
  return { status: response.status, body: await response.json() }
}
