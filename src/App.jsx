import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PaymentsPage from "./features/payments/PaymentsPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaymentsPage />
    </QueryClientProvider>
  );
}

export default App;
