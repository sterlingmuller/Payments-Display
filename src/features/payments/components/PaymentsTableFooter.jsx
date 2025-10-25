import "../styles/PaymentsTable.css";

const PaymentsTableFooter = ({
  paymentDates,
  onDateChange,
  paginationStack,
  nextPaginationId,
  onPreviousPage,
  onNextPage,
  hasPrevDate,
  hasNextDate,
  selectedDateIndex,
}) => {
  const handlePreviousDate = () => {
    const newIndex = selectedDateIndex - 1;
    onDateChange(paymentDates[newIndex]);
  };

  const handleNextDate = () => {
    const newIndex = selectedDateIndex + 1;
    onDateChange(paymentDates[newIndex]);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
      }}
    >
      {/* TODO: Replace Date buttons with a Date Picker
      Calendar Icon should be beside Header Title Date */}
      <div style={{ justifySelf: "start" }}>
        {hasPrevDate && (
          <button onClick={handlePreviousDate} className="pagination-button">
            ← Previous Date
          </button>
        )}
      </div>
      <div>
        {paginationStack.length > 1 && (
          <button onClick={onPreviousPage} className="pagination-button">
            {"< "}
          </button>
        )}
        {/* TODO: Hook up page numbers to paginated fetch */}
        <span className="pagination-text">1 2 3... 7</span>
        {nextPaginationId && (
          <button onClick={onNextPage} className="pagination-button">
            {" >"}
          </button>
        )}
      </div>
      <div style={{ justifySelf: "end" }}>
        {hasNextDate && (
          <button onClick={handleNextDate} className="pagination-button">
            Next Date →
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentsTableFooter;
