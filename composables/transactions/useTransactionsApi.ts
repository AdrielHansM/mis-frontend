import useApi from "../accounts/useAccountsApi"

const useTransactionsApi = () => {
  const runtimeConfig = useRuntimeConfig()
  const { token } = useApi()

  const apiGetTransactions = async () => {
    const response: TransactionResponse = await $fetch(runtimeConfig.public.API_URL + '/transaction', {
      method: 'GET'
    })
    const transactions: Transaction[] = response.data.data
    return transactions
  }

  const apiPostTransaction = async (transaction: Transaction) => {

    let requestBody: Transaction = {
      customer_id: transaction.customer_id,
      transaction_type: transaction.transaction_type,
      total_amount: transaction.total_amount,
      transaction_date: transaction.transaction_date,
    }

    if (transaction.transaction_type === "PAYMENT") {
      requestBody.payment = transaction.payment
    }

    if (transaction.transaction_type === "ORDER") {
      requestBody.order_item = transaction.order_item
    }

    try {
      const response = await $fetch(runtimeConfig.public.API_URL + '/transaction', {
        headers: {
          "Authorization": `Bearer ${token.value}`
        },
        method: 'POST',
        body: requestBody
      });
      return response;
    } catch (error) { throw error }
  }

  return {
    token,
    apiGetTransactions,
    apiPostTransaction
  }
}

export default useTransactionsApi