import { apiSlice } from "../services/apiSlice";

const base_url = 'menus/'

const requestsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getMenuDetails: builder.query({
            query:({resturant_id}:{resturant_id:string})=>({
                url     : `${base_url}${resturant_id}/details/`,
            }),
            providesTags: ['menus']
        }),




        
        getSectionsList: builder.query({
            query:({resturant_id}:{resturant_id:string})=>({
                url     : `${base_url}${resturant_id}/sections/`,
            }),
            providesTags:['menus']
        }),

        addSection: builder.mutation({
            query:({resturant_id, form}:{resturant_id:string, form:FormData})=>({
                url     : `${base_url}${resturant_id}/sections/add/`,
                method  : 'POST',
                body    : form
            }),
            invalidatesTags : ['menus']
        }),
        
      
    }) 
})


export const {
    useGetMenuDetailsQuery,

    useGetSectionsListQuery,
    useAddSectionMutation,

} = requestsApiSlice

