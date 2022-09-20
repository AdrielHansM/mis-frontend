interface Transaction {
  id?: number
  customer_id: number
  transaction_type: string
  total_amount: number
  transaction_date: Date
  order_item?: OrderItem[]
  payment?: Payment[]
  created_at?: Date
  updated_at?: Date
}

interface OrderItem {
  id?: number
  transaction_id?: number
  inventory_id: number
  item_amount: number
  item_quantity: number
  created_at?: Date
  updated_at?: Date
  inventory?: Inventory
}

interface Payment {
  id?: number,
  transaction_id?: number
  payment_method: string
  payment_amount: number
  payment_date: Date
  created_at?: Date
  updated_at?: Date
}

interface TransactionResponse {
  data: {
    data: Transaction[]
    meta: any
  }
}