
const useUtilities = () => {

  const formatPhoneNumber = (phoneNumberString: string) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(0|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = (match[1] ? '+63 ' : '');
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
  }

  const formatDate = (updatedAt: Date) => {
    const date = new Date(updatedAt)
    return new Intl.DateTimeFormat('en-US').format(date)
  }

  const formatCurrency = (currency: number) => {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'PHP' }).format(currency);
  }

  const computeOrders = (transactions: Transaction[]) => {
    const currentBalance = ref(0);
    if (!!transactions) {
      transactions.forEach(transaction => {
        if (transaction.transaction_type === "ORDER") {
          currentBalance.value += transaction.total_amount
        }
      })
    }
    return currentBalance.value;
  }

  const computePayments = (transactions: Transaction[]) => {
    const totalPayment = ref(0);
    if (!!transactions) {
      transactions.forEach(transaction => {
        if (transaction.transaction_type === "PAYMENT") {
          totalPayment.value += transaction.total_amount
        }
      })
    }
    return totalPayment.value;
  }

  return {
    formatPhoneNumber,
    formatDate,
    formatCurrency,
    computeOrders,
    computePayments,
  }
}
export default useUtilities