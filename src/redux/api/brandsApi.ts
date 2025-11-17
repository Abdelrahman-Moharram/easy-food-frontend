import { apiSlice } from "../services/apiSlice";

const base_url = 'utils/brands/'
const brandsApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder)=>({
        getBrandsList: builder.query({
            query:({page, size}:{page:number, size:number})=>({
                url:base_url+'',
                params:{page, size}
            }),
            providesTags:['brands']
        }),
        
        // ------------------------------------------------ //

    }) 
})


export const {
    useGetBrandsListQuery
} = brandsApiSlice

