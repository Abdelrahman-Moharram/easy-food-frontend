import { apiSlice } from "../services/apiSlice";

const base_url = 'resturants/'

const resturantsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getResturantBranchesByCity: builder.query({
            query:()=>({
                url:base_url+'branches/',
            }),
            providesTags:['resturants']
        }),
        
        // ------------------------------------------------ //

        

    }) 
})


export const {
    useGetResturantBranchesByCityQuery

} = resturantsApiSlice

