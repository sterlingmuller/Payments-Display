import PaymentsTableRow from "../subcomponents/PaymentsTableRow";
import "../styles/PaymentsTable.css";

const PaymentsTable = ({ payments }) => {
  return (
    <div className="table-container">
      <div className="col-header-row">
        <div />
        <div>Effective Date</div>
        <div>Bank Account ID</div>
        <div>Amount</div>
      </div>
      {payments.map((payment) => (
        <PaymentsTableRow key={payment.paymentId} payment={payment} />
      ))}
    </div>
  );
};

export default PaymentsTable;
