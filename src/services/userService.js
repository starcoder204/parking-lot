import { apiBaseUrl, appToken } from '@/config/settings'
import { handleResponse } from './utils'

export function userApi (payload) {
  const requestOptions = {
    method: 'POST'
  }
  const formData = new FormData()
  formData.append('token', appToken)
  for (const key in payload) {
    formData.append(key, payload[key])
  }
  requestOptions.body = formData
  return fetch(apiBaseUrl, requestOptions).then(handleResponse)
}
