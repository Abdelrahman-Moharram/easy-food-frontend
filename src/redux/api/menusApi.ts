import { apiSlice } from "../services/apiSlice";

const base_url = 'menus/'

const requestsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getMenuDetails: builder.query({
            query:()=>({
                url     : `${base_url}details/`,
            }),
            providesTags: ['menus']
        }),




        
        getSectionsList: builder.query({
            query:()=>({
                url     : `${base_url}sections/`,
            }),
            providesTags:['menus']
        }),

        addSection: builder.mutation({
            query:({form}:{form:FormData})=>({
                url     : `${base_url}sections/add/`,
                method  : 'POST',
                body    : form
            }),
            invalidatesTags : ['menus']
        }),

        deleteSection: builder.mutation({
            query:({section_id}:{section_id:string})=>({
                url     : `${base_url}sections/${section_id}/remove/`,
                method  : 'DELETE',
            }),
            invalidatesTags : ['menus']
        }),
        
      
    }) 
})


export const {
    useGetMenuDetailsQuery,

    useGetSectionsListQuery,
    useAddSectionMutation,
    useDeleteSectionMutation

} = requestsApiSlice

