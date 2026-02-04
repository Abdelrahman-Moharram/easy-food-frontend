import React from 'react'

const SectionHeader = ({title}:{title:string}) => {
  return (
    <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold text-neutral-800">{title}</h2>
        <div className="h-px flex-1 bg-neutral-200"></div>
    </div>
  )
}

export default SectionHeader
