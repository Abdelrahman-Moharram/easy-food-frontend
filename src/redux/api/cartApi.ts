import { apiSlice } from "../services/apiSlice";

const base_url = 'cart/'

const cartApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getCart: builder.query<any, void>({
            query: () => ({
                url: `${base_url}cart/`,
            }),
            providesTags: ['cart']
        }),
        

        addToCart: builder.mutation({
            query: ({form}:{form:FormData}) => ({
                url     : `${base_url}cart/add/`,
                method  : 'POST',
                body    : form
            }),
            invalidatesTags: ['cart']
        }),

        updateCartItem: builder.mutation({
            query: ({form}:{form:FormData}) => ({
                url     : `${base_url}cart/update/`,
                method  : 'PATCH',
                body    :  form
            }),
            invalidatesTags: ['cart']
        }),

        removeFromCart: builder.mutation({
            query: ({ order_item_id }) => ({
                url: `${base_url}cart/remove/${order_item_id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['cart']
        }),

        
    })
})


export const {
    useGetCartQuery,
    useAddToCartMutation,
    useUpdateCartItemMutation,
    useRemoveFromCartMutation,
} = cartApiSlice
