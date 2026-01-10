import React from 'react'

const SectionHeader = ({name}:{name:string}) => {
  return (
    <div className="flex items-center gap-3 mb-2">
        <div className="w-2 h-8 bg-neutral-900"></div>
        <h2 className="text-xl font-bold uppercase tracking-wide text-neutral-800">{name}</h2>
    </div>
  )
}

export default SectionHeader
