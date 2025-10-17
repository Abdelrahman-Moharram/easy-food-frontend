import React, { useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { useGetUsersListQuery } from '../../../redux/api/accountsApi'
import { to_int_or_default } from '../../../Components/utils/helper'
import DataTable from '../../../Components/Tables/DataTable'
import Paginition from '../../../Components/Lists/Paginition'
import { useSearchParams } from 'react-router-dom'
import UserFormOverLay from './_Components/AddUserOverLay'
import { EditIcon } from '../../../Components/utils/Icons'
import { IsAllowedPermissionOrNull } from '../../Guards/IsAllowedPermission'
import { useTranslation } from "react-i18next";



const UsersSettings = () => {

  const {t} = useTranslation();
  const [showOverLay, setShowOverLay] = useState(false)
  const [userId, setUserId] = useState('')
  const [searchParams] = useSearchParams();

  
  const size = to_int_or_default(searchParams.get("size")) 
  const page = to_int_or_default(searchParams.get("page")) 
  
  

  const handleOverLay = () =>{
    if(userId)
      setUserId('')
    setShowOverLay(!showOverLay)
  }
  const {data, isLoading} = useGetUsersListQuery({page, size})

  const options = (row)=>(
    <div className='flex gap-4 items-start'>
      <IsAllowedPermissionOrNull
        permission='permissions.users.edit'
      >
        <button onClick={()=>{handleOverLay();setUserId(row?.id)}} className='text-lg transition-all rounded-full' ><EditIcon />
        </button>
      </IsAllowedPermissionOrNull>
    </div>
  )

  return (
    <>
      <UserFormOverLay
        handleOpen={handleOverLay}
        open={showOverLay}
        userId={userId}
      />
      <div className='px-4'>
        
        <div className="my-8 flex justify-end items-center">
        
          <button 
              onClick={handleOverLay}
              className="px-8 bg-primary text-negative-color hover:bg-primary/90 transition-all h-fit p-2 rounded-md text-negitaive-color flex items-center gap-3"
            >
              <FaPlusCircle /> 
              {t("Add User")}
          </button>
        </div>

        <DataTable
          data={data?.data}
          isLoading={isLoading}
          fnKeys={['id']}
          emptyLinkHref='/settings/users'
          emptyText={t("No Users Available")}
          isOptions
          options={options}
        />
        <div className='flex justify-center my-10 font-extrabold'>
            <Paginition
              totalPages={data?.total_pages}
            /> 
        </div>
      </div>
    </>
  )
}

export default UsersSettings
