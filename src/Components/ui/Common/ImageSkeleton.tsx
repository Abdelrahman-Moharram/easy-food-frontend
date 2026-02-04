import React from 'react'


interface props{
  width:string;
  height:string;
  rounded?:string;
  margin?:string;
  shadow?: boolean
}
const ImageSkeleton = ({width, height, rounded='0px', margin='0px', shadow=true}:props) => {
    return (
      <div 
          className={"bg-slate-200 animate-pulse "+(shadow?"shadow-md":"")}
          style={{
                width,
                height,
                borderRadius:rounded,
                margin:margin,
            }}
          >
      </div>
    )
  }

export const  ListImageSkeletons = ({number, width, height, rounded='0px', margin='0px', shadow=true}:{number:number}&props) => {
  const l = []
  for (let i = 0; i < number; i++){
      l.push(
          <ImageSkeleton
            height={height}
            width={width}
            rounded={rounded}
            margin={margin}
            shadow={shadow}
            key={i}
          />
      )
  }
  return l
}


export const  Loading = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
)

export default ImageSkeleton
