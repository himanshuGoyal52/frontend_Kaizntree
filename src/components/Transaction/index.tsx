import { useCallback, useState } from "react"
import { fakeFetch } from "../../utils/fetch"
import { SuccessResponse } from "../../utils/types"
import { InputCheckbox } from "../InputCheckbox"
import { TransactionPaneComponent } from "./types"

export const TransactionPane: TransactionPaneComponent = ({ transaction }) => {
  const [approved, setApproved] = useState(transaction.approved)

  const setTransactionApproval = useCallback(
    (newValue: boolean) => {
      fakeFetch<SuccessResponse>("setTransactionApproval", {
        transactionId: transaction.id,
      })
      setApproved(newValue)
    },
    [transaction.id]
  )

  return (
    <div className="KaizntreePane">
      <div className="KaizntreePane--content">
        <p className="KaizntreeText">{transaction.merchant} </p>
        <b>{moneyFormatter.format(transaction.amount)}</b>
        <p className="KaizntreeText--hushed KaizntreeText--s">
          {transaction.employee.firstName} {transaction.employee.lastName} - {transaction.date}
        </p>
      </div>
      <InputCheckbox id={transaction.id} checked={approved} onChange={setTransactionApproval} />
    </div>
  )
}

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})
