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

        sendRequestsList: builder.mutation({
            query:({form}:{form:FormData})=>({
                url:base_url+'send/',
                method:'post',
                body:form
            }),
        }),

    }) 
})


export const {
    useGetRequestsListQuery,
    useSendRequestsListMutation

} = requestsApiSlice

