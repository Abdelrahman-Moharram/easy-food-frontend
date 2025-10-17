import { ImageSkeleton } from '../../Components/Common'
import SmallCardsList from '../../Components/Lists/SmallCardsList'
import { SmallCard } from '../../Components/Cards'

interface itemType{
  label:string
  href:string
  icon?:React.ReactNode | string
  icon_str?: string
  image?:string
  description?: string
  color?:string
}
const DynamicSkeleton = () =>{
  const l = []
  for(let i = 0; i < 3; i++)
  {
    l.push(
      <ImageSkeleton
        height='90px'
        width='100%'
        rounded='10px'
        margin='4px'
        shadow
        key={i}
      />
    )
  }
  return l
}
const CardsList = () => {
  
  return (
    <div className={"grid md:grid-cols-3 gap-5 grid-cols-1"}>
    
    </div>
  )
}

export default CardsList
