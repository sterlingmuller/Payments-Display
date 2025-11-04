import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PaymentsTable from "./components/PaymentsTable";
import PaymentsTableFooter from "./components/PaymentsTableFooter";
import { fetchPaymentsByPage } from "./api/paymentsService";
import { formatDate } from "../../helpers/formatDate";
import RefreshIcon from "../../common/svgs/RefreshIcon";
import "./styles/PaymentsTable.css";
import { PAGINATION_START_ID } from "./constants";

const PaymentsPage = () => {
  const [paginationStack, setPaginationStack] = useState([PAGINATION_START_ID]);
  const currentPagination = paginationStack[paginationStack.length - 1];

  // TODO: Seek clarification on dates. 2nd and 4th Friday of the month?
  // Only two dates or does this apply to every month? Consider switching to a Date Picker with only valid dates selecatable

  const paymentDates = ["2024-06-14", "2024-06-28"];
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const selectedDate = paymentDates[selectedDateIndex];
  const hasPrevDate = selectedDateIndex > 0;
  const hasNextDate = selectedDateIndex < paymentDates.length - 1;

  // React Query has useInfiniteQuery hook we could use if we wanted to infinitely scroll, instead of press to paginate

  const {
    isPending,
    data: paymentsData,
    error,
  } = useQuery({
    queryKey: ["payments", currentPagination, selectedDate],
    queryFn: () => fetchPaymentsByPage(selectedDate, currentPagination),
  });

  const payments = paymentsData?.payments ?? [];
  const nextPaginationId = paymentsData?.nextPaginationId ?? null;

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

  const handleDateChange = (newIndex) => {
    setSelectedDateIndex(newIndex);
    setPaginationStack([PAGINATION_START_ID]);
  };

  const handleRefresh = () => {
    setPaginationStack([PAGINATION_START_ID]);
  };

  // TODO: Cleanup Loading / Error state.
  // Can pull loading and error state from react query returned object
  // Should also move loading display to inside a table and error to a toast notification, not blocking rest of ui

  if (isPending) return <div>Loading...</div>;
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
      />
    </div>
  );
};

export default PaymentsPage;
