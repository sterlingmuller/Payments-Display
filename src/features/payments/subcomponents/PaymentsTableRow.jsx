import CheckCircleIcon from "../../../common/svgs/CheckCircleIcon";
import { formatDate } from "../../../helpers/formatDate";

const PaymentsTableRow = ({ payment }) => {
  return (
    <div className="table-row">
      {/* TODO: Create XCircle icon for bad payment status
      Conditionally render expected icon */}
      <div className="payment-status-icon">
        <CheckCircleIcon />
      </div>
      <div className="table-cell">{formatDate(payment.effectiveDate)}</div>
      <div className="table-cell">{payment.bankAccountId}</div>
      {/* TODO: Update API to return payment type: withdraw / deposit
      Display '-' or '+' accordingly */}
      <div className="amount-cell">-${payment.amount.toFixed(2)}</div>
    </div>
  );
};

export default PaymentsTableRow;
