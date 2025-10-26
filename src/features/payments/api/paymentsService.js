import { PAGINATION_END_ID, PAGINATION_LIMIT } from "../constants";

const VITE_API_TOKEN = import.meta.env.VITE_API_TOKEN;
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchPaymentByDate = async (date, continuationToken) => {
  const url = `${VITE_API_BASE_URL}/payments?date=${date}&continuationToken=${continuationToken}`;
  const options = { method: "GET", headers: { Authorization: VITE_API_TOKEN } };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Failed to fetch payments");
  }

  return response.json();
};

export const fetchPaymentsByPage = async (date, initialPageId) => {
  const payments = [];
  let continuationToken = initialPageId;

  for (let i = 0; i < PAGINATION_LIMIT; i++) {
    if (continuationToken === PAGINATION_END_ID) break;
    const result = await fetchPaymentByDate(date, continuationToken);

    payments.push(result.data);
    continuationToken = result.data.paginationToken;
  }

  return {
    payments,
    nextPaginationId: continuationToken,
  };
};
