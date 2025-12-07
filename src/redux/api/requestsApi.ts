import { apiSlice } from "../services/apiSlice";

const base_url = 'requests/'

const requestsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getRequestsList: builder.query({
            query:()=>({
                url:base_url+'',
            }),
            providesTags:['requests']
        }),
        
        // ------------------------------------------------ //

    }) 
})


export const {
    useGetRequestsListQuery,

} = requestsApiSlice

