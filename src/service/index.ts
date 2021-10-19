import qs from 'qs'
import { logout } from '@/utils/handle-auth'

export const apiUrl = process.env.REACT_APP_API_URL

interface RequestConfig extends RequestInit {
  token?: string
  data?: object
}

export const request = async (
  endponit: string,
  { data, token, headers, ...customConfig }: RequestConfig = {}
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...customConfig
  }

  if (config.method?.toUpperCase() === 'GET') {
    endponit += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }

  return window.fetch(`${apiUrl}/${endponit}`, config).then(async (res) => {
    if (res.status === 401) {
      await logout()
      window.location.reload()
      return Promise.reject()
    }
    const data = await res.json()
    if (res.ok) {
      return data
    } else {
      // fetch不會主動拋出異常
      return Promise.reject(data)
    }
  })
}
