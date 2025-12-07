import React, { FormEvent } from 'react'
import { useGetRequestsListQuery, useSendRequestsListMutation } from '../../redux/api/requestsApi'
import { InfoSectionCard } from '../../Components/ui/Cards';
import { CheckBox } from '../../Components/ui/Forms';
import useForm from '../../Components/ui/Hooks/Forms/useForm';
import Button from '../../Components/ui/Common/Button';

const ManualUpload = () => {
  const {
    form,
    setForm,
    getFormData
  } = useForm({requests_ids: []})

  const {data}              = useGetRequestsListQuery({})
  const [sendRequestsList]  = useSendRequestsListMutation()
  
  const handleReqs = (id:string) => {
    if(form?.requests_ids.includes(id))
      setForm({...form, requests_ids:form?.requests_ids.filter(r=>r !== id)})
    else
      setForm({...form, requests_ids:[...form?.requests_ids ?? [], id]})
  }

  const onSubmit = (e:FormEvent) =>{
    e.preventDefault()

    
    sendRequestsList({form:getFormData()})
  }

  console.log(getFormData());
  
  
  
  return (
    <div>
    {
      data?.map(section=>(
        <InfoSectionCard
          title={section.name}
          key={section.name}
        >
          <form onSubmit={onSubmit} className="flex flex-auto gap-3 w-full">
            {section?.data.map(req => (
              <div key={req.id} className="w-full">
                <CheckBox
                  changeCheckBox={() => handleReqs(req.id)}
                  checked={form?.requests_ids.includes(req.id)}
                  label={req.name}
                  labelId={req.id}
                  name="requests"
                />
              </div>
            ))}

            <Button 
              title='Submit'
              variant='primary'
              submit
            />
          </form>
        </InfoSectionCard>
      ))
    }
    </div>
  )
}

export default ManualUpload
