import { apiSlice } from "../services/apiSlice";

const base_url = 'orders/'

const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getCart: builder.query<any, void>({
            query: () => ({
                url: `${base_url}cart/`,
            }),
            providesTags: ['orders']
        }),
        

        addToCart: builder.mutation({
            query: ({form}:{form:FormData}) => ({
                url     : `${base_url}cart/add/`,
                method  : 'POST',
                body    : form
            }),
            invalidatesTags: ['orders']
        }),

        updateCartItem: builder.mutation({
            query: ({form}:{form:FormData}) => ({
                url     : `${base_url}cart/update/`,
                method  : 'PATCH',
                body    :  form
            }),
            invalidatesTags: ['orders']
        }),

        removeFromCart: builder.mutation({
            query: ({ order_item_id }) => ({
                url: `${base_url}cart/remove/${order_item_id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['orders']
        }),

        createOrder: builder.mutation({
            query: ({form}:{form:FormData}) => ({
                url     : `${base_url}create/`,
                method  : 'POST',
                body    : form
            }),
            invalidatesTags: ['orders']
        }),

    })
})


export const {
    useGetCartQuery,
    useAddToCartMutation,
    useUpdateCartItemMutation,
    useRemoveFromCartMutation,
    useCreateOrderMutation,
} = ordersApiSlice
