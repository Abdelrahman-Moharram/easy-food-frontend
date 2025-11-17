import React from 'react'
import { EditDeleteButtons } from './ButtonsGroups'
import { ImageSkeleton } from '../../../Components/Common'
import EmptyData from '../../../Components/Common/EmptyData'
import Paginition from '../../../Components/Lists/Paginition'
import { FnBasicCard } from '../../../Components/Cards'


const handleImageSkeleton = () =>{
    const l = []
    for(let i = 0; i < 24; i ++){
        l.push(<ImageSkeleton
            height='80px'
            width='100%'
            rounded='10px'
        />)
    }
    return l
}

interface Props{
    isLoading: boolean,
    data: any[],
    editAction?:(row:any)=>void,
    deleteAction?:(row:any)=>void,
    total_pages:number,
    emptyMessage?:string
}
const CardsListWithPagination = ({data, deleteAction, editAction, isLoading, total_pages, emptyMessage}:Props) => {
    
  return (
    <div>
      {
            !isLoading?
                data?.length?
                    // Cards

                    <div className="grid lg:grid-cols-4 md:lg:grid-cols-3 sm:lg:grid-cols-2 xs:lg:grid-cols-1 gap-3">
                        {
                            data.map((item:{id:string, name:string})=>(
                                <FnBasicCard
                                    key={item?.id}
                                    keyName={item?.name}
                                >
                                    <EditDeleteButtons
                                        editAction={editAction}
                                        deleteAction={deleteAction}
                                        item={item}
                                    />
                                </FnBasicCard>
                            ))
                        }
                        
                    </div>

                    // Table

                    // <div className="w-[100%] mx-auto">
                    //     <DataTable
                    //         data={data}
                    //         emptyLinkHref=''
                    //         emptyText=''
                    //         fnKeys={['id']}
                    //         isLoading={isLoading}
                    //         isOptions
                    //         options={customOptions?customOptions:options}
                    //         optionsHeader=''
                    //         showCounter
                    //     />
                    // </div>

                :
                    <EmptyData
                        height='100px'
                        message={emptyMessage || 'No Data'}
                    />
            :
                <div className="grid lg:grid-cols-4 md:lg:grid-cols-3 sm:lg:grid-cols-2 xs:lg:grid-cols-1 gap-3">
                    {handleImageSkeleton()}
                </div>
        }
    
        <div className='flex justify-center my-10 font-extrabold'>
            <Paginition
                totalPages={total_pages}
            />                
        </div>
    </div>
  )
}

export default CardsListWithPagination
