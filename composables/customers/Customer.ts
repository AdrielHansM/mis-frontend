interface Customer {
  id?: number
  first_name: string
  last_name: string
  clinic_name: string
  area: string
  discipline: string
  contact: string
  email: string
  created_at?: Date
  updated_at?: Date
  transaction?: Transaction[]
}

interface CustomerResponse {
  data: {
    data: Customer[]
    meta: any
  }
}