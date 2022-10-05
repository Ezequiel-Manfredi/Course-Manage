import { API_URL, UNAUTHORIZED } from '../utils/constants'

export const apiCall = async (endpoit, method = 'GET', body = {}) => {
  const options = {
    headers: { 'Content-Type': 'application/json' },
    method,
    body: JSON.stringify(body)
  }
  const response = await fetch(API_URL + endpoit, options)
  if (response.status === UNAUTHORIZED) return { status: UNAUTHORIZED }
  return { status: response.status, body: await response.json() }
}
