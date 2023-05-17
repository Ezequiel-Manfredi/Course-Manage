import { ENDPOINT, METHOD } from '../utils/constants'
import { apiCall } from './apiCall'

export function searchSchools(response, error, search, login) {
  apiCall({ endpoit: ENDPOINT.SCHOOLS.SEARCH(search), method: METHOD.GET, login })
    .then(response)
    .catch(error)
}
