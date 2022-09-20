interface Inventory {
  id?: number,
  product_id: string,
  quantity: number,
  expiry_date: Date,
  product?: Product,
  orderItem?: Object[],
  created_at?: Date,
  updated_at?: Date,
}

interface InventoryResponse {
  data: {
    data: Inventory[],
    meta: any
  }
}