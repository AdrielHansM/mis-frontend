interface Product {
  id?: number,
  manufacturer_id: string,
  product_name: string
  price: number
  type: string
  category: string
  dosage: number
  created_at?: Date
  updated_at?: Date
  inventory?: Inventory[]
  manufacturer?: Manufacturer
  image_url: string

}


interface ProductResponse {
  data: {
    data: Product[]
    meta: any
  }
}