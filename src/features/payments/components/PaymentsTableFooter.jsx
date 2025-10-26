import "../styles/PaymentsTable.css";

const PaymentsTableFooter = ({
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
    onDateChange(selectedDateIndex - 1);
  };

  const handleNextDate = () => {
    onDateChange(selectedDateIndex + 1);
  };

  return (
    <div className="payments-footer">
      {/* TODO: Replace Date buttons with a Date Picker
      Calendar Icon should be beside Header Title Date */}
      <div>
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
        {/* TODO: Hook up page numbers to paginated fetch
        Replace hard coded values with values from pagination length*/}
        <span className="pagination-text">1 2 3... 7</span>
        {nextPaginationId && (
          <button onClick={onNextPage} className="pagination-button">
            {" >"}
          </button>
        )}
      </div>
      <div>
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
