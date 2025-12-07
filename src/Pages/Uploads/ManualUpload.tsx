import React from 'react'
import { useGetRequestsListQuery } from '../../redux/api/requestsApi'
import CardInfoSection from '../../Components/Common/CardInfoSection';

const ManualUpload = () => {

  const {data, isLoading} = useGetRequestsListQuery({})
  console.log(data);
  
  return (
    <div>
      <CardInfoSection
        title={data}
      >

      </CardInfoSection>
    </div>
  )
}

export default ManualUpload
