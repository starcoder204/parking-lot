import { apiBaseUrl, appToken } from '@/config/settings'
import { handleResponse } from './utils'

export function userList (payload) {
  const requestOptions = {
    method: 'POST'
  }
  let formData = new FormData()
  formData.append('token', appToken)
  let key
  for (key in payload) {
    formData.append(key, payload[key])
  }
  requestOptions.body = formData
  return fetch(apiBaseUrl, requestOptions).then(handleResponse)
}
