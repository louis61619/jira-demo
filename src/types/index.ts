export type User = {
  id: number
  name: string
  email: string
  title: string
  organization: string
  token: string
}

export type AuthForm = {
  username: string
  password: string
}

export type Raw = string | number
