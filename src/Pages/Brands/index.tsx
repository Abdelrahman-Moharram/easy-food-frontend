import React from 'react'
import { CardsListWithPagination } from '../Settings/_Components'
import { useGetBrandsListQuery } from '../../redux/api/brandsApi'


const Brands = () => {

  const {data, isLoading}        = useGetBrandsListQuery({page:1, size:10})
  // const [searchParams]           = useSearchParams()
  // const size                     = to_int_or_default(searchParams.get("size")) 
  // const page                     = to_int_or_default(searchParams.get("page")) 
  
  return (
    <div className='bg-white p-5 my-8 default-shadow-md'>
      <CardsListWithPagination 
        data={data?.data}
        isLoading={isLoading}
        total_pages={data?.total_pages}
      />
    </div>
  )
}

export default Brands
