import { request } from '@/service'
import { getToken } from './handle-auth'

export const boostrapUser = async () => {
  let user = null
  const token = getToken()
  if (token) {
    const data = await request('me', { token })
    user = data.user
  }
  return user
}
