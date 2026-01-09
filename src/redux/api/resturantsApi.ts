import { apiSlice } from "../services/apiSlice";

const base_url = 'resturants/'

const requestsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getRequestsList: builder.query({
            query:()=>({
                url:base_url+'',
            }),
            providesTags:['resturants']
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

