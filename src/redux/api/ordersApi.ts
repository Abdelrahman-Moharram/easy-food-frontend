import { apiSlice } from "../services/apiSlice";

const base_url = 'orders/'

const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({


        listOrders: builder.query({
            query: () => ({
                url: `${base_url}`,
                method: 'GET',
            }),
            providesTags: ['orders']
        }),

        createOrder: builder.mutation({
            query: ({ form }: { form: FormData }) => ({
                url: `${base_url}create/`,
                method: 'POST',
                body: form
            }),
            invalidatesTags: ['cart']
        }),

        updateOrderState: builder.mutation({
            query: ({ order_id, state }: { order_id: string; state: string }) => ({
                url: `${base_url}${order_id}/state/change/`,
                method: 'PATCH',
                body: { state }
            }),
            invalidatesTags: ['orders']
        }),

    })
})


export const {
    useListOrdersQuery,
    useCreateOrderMutation,
    useUpdateOrderStateMutation,
} = ordersApiSlice
