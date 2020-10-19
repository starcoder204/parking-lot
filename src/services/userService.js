import { apiBaseUrl, appToken } from '@/config/settings'
import { handleResponse } from './utils'

export function userList () {
  const requestOptions = {
    method: 'POST'
  }
  var formData = new FormData()
  formData.append('token', appToken)
  formData.append('admin', 'user_list')
  requestOptions.body = formData
  return fetch(apiBaseUrl, requestOptions).then(handleResponse)
}
