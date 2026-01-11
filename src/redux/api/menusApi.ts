import { apiSlice } from "../services/apiSlice";

const base_url = 'menus/'

const requestsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMenuDetails: builder.query({
            query: () => ({
                url: `${base_url}details/`,
            }),
            providesTags: ['menus']
        }),





        getSectionsList: builder.query({
            query: () => ({
                url: `${base_url}sections/`,
            }),
            providesTags: ['menus']
        }),

        addSection: builder.mutation({
            query: ({ form }: { form: FormData }) => ({
                url: `${base_url}sections/add/`,
                method: 'POST',
                body: form
            }),
            invalidatesTags: ['menus']
        }),

        deleteSection: builder.mutation({
            query: ({ section_id }: { section_id: string }) => ({
                url: `${base_url}sections/${section_id}/delete/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['menus']
        }),

        swapSection: builder.mutation({
            query: ({ first_id, second_id }: { first_id: string, second_id: string }) => ({
                url: `${base_url}sections/swap/`,
                method: 'POST',
                body: { first_id, second_id }
            }),
            invalidatesTags: ['menus']
        }),


    })
})


export const {
    useGetMenuDetailsQuery,

    useGetSectionsListQuery,
    useAddSectionMutation,
    useDeleteSectionMutation,
    useSwapSectionMutation

} = requestsApiSlice

