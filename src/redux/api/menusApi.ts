import { apiSlice } from "../services/apiSlice";

const base_url = 'menus/'

const requestsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getMenuDetails: builder.query({
            query:({resturant_id}:{resturant_id:string})=>({
                url:`${base_url}${resturant_id}/details/`,
            }),
            providesTags:['menus']
        }),
        
      
    }) 
})


export const {
    useGetMenuDetailsQuery,

} = requestsApiSlice

