import { useState, useEffect } from "react";
import PaymentsTable from "./components/PaymentsTable";
import PaymentsTableFooter from "./components/PaymentsTableFooter";
import { fetchPaymentsForPage } from "./api/paymentsService";
import { formatDate } from "../../helpers/formatDate";
import RefreshIcon from "../../common/svgs/RefreshIcon";
import "./styles/PaymentsPage.css";
import { PAGINATION_START_ID } from "./constants";

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paginationStack, setPaginationStack] = useState([PAGINATION_START_ID]);
  const currentPagination = paginationStack[paginationStack.length - 1];
  const [nextPaginationId, setNextPaginationId] = useState(null);

  // TODO: Seek clarification on dates. 2nd and 4th Friday of the month?
  // Only two dates or does this apply to every month? Consider switching to a Date Picker with only valid dates selecatable
  const paymentDates = ["2024-06-14", "2024-06-28"];
  const [selectedDate, setSelectedDate] = useState(paymentDates[0]);
  const selectedDateIndex = paymentDates.indexOf(selectedDate);
  const hasPrevDate = selectedDateIndex > 0;
  const hasNextDate = selectedDateIndex < paymentDates.length - 1;

  // TODO: Replace fetching on useEffect with React Query
  // React Query auto caches responses so we won't have to worry about refiring API calls

  // React Query also has useInfiniteQuery hook we could use if we wanted to infinitely scroll, instead of press to paginate

  useEffect(() => {
    const loadPayments = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchPaymentsForPage(
          selectedDate,
          currentPagination
        );
        setPayments(result.payments);
        setNextPaginationId(result.nextPaginationId);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, [selectedDate, currentPagination]);

  const handlePreviousPage = () => {
    if (paginationStack.length > 1) {
      setPaginationStack((currStack) => currStack.slice(0, -1));
    }
  };

  const handleNextPage = () => {
    if (nextPaginationId) {
      setPaginationStack((currStack) => [...currStack, nextPaginationId]);
    }
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setPaginationStack([PAGINATION_START_ID]);
    setNextPaginationId(null);
  };

  const handleRefresh = () => {
    setPaginationStack([PAGINATION_START_ID]);
    setNextPaginationId(null);
  };

  // TODO: Cleanup Loading / Error state.
  // Can pull loading and error state from react query returned object
  // Should also move display to inside of table, not blocking rest of ui
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="payments-header">
        <span className="date-display">
          Payments for {formatDate(selectedDate)}
        </span>
        <button className="refresh-button" onClick={handleRefresh}>
          <RefreshIcon />
        </button>
      </div>
      <PaymentsTable payments={payments} />
      <PaymentsTableFooter
        hasPrevDate={hasPrevDate}
        hasNextDate={hasNextDate}
        onDateChange={handleDateChange}
        paginationStack={paginationStack}
        nextPaginationId={nextPaginationId}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
        selectedDateIndex={selectedDateIndex}
        paymentDates={paymentDates}
      />
    </div>
  );
};

export default PaymentsPage;
