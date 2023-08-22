import { ORDERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      createOrder: builder.mutation({
         query: (order) => ({
            url: ORDERS_URL,
            method: "POST",
            body: { ...order },
         }),
      }),
      getOrderDetails: builder.query({
         query: (orderId) => ({ url: `${ORDERS_URL}/${orderId}` }),
         keepUnusedDataFor: 5, // 5 seconds
      }),
      payOrder: builder.mutation({
         query: ({ orderId, details }) => ({
            url: `${ORDERS_URL}/${orderId}/pay`,
            method: "PUT",
            body: { ...details },
         }),
      }),
      getPayPalClientId: builder.query({
         query: () => ({ url: `${ORDERS_URL}/config/paypal` }),
         keepUnusedDataFor: 5, // 5 seconds
      }),
   }),
});

export const {
   useCreateOrderMutation,
   useGetOrderDetailsQuery,
   usePayOrderMutation,
   useGetPayPalClientIdQuery,
} = ordersApiSlice;
