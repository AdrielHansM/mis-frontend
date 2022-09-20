interface Manufacturer {
  id?: number,
  name: string,
  created_at?: Date,
  updated_at?: Date,
}

interface ManufacturerResponse {
  data: {
    data: Manufacturer[],
    meta: any
  }
}