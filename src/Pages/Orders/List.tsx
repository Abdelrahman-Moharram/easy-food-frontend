import { useListOrdersQuery } from '../../redux/api/ordersApi'
import { Loading } from '../../Components/ui/Common/ImageSkeleton';
import OrderBoard from '../../Components/pages/orders/manage/OrderBoard';

const List = () => {
  const { data, isLoading } = useListOrdersQuery(undefined)
  
  return (
    <div className="p-6 md:p-10 min-h-screen bg-neutral-50/50">
      {isLoading
        ? <Loading />
        : <OrderBoard initialData={data || { Received: [], Preparing: [], Done: [], Closed: [] }} />
      }
    </div>
  )
}

export default List
