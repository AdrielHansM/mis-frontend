
interface Token {
  data: {
    type: string
    token: string
  }
}

interface AccountResponse {
  data: {
    data: Account[]
    meta: any
  }
}

interface Account {
  id: number
  name: string
  email: string
  rememberMeToken?: string
  created_at: Date
  updated_at: Date
}
