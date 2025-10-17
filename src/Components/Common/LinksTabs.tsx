import React from 'react'
import { Link, useLocation } from 'react-router-dom'

interface TabType {
  link: string
  title: string
  icon?: React.ReactNode
}

const LinksTabs = ({ tabs }: { tabs: TabType[] }) => {
  const { pathname } = useLocation()
  const normalizedPath = pathname.toLowerCase()

  return (
    <div className="flex border-b border-gray-200">
      {tabs?.map((tab) => {
        const tabLink = tab.link.toLowerCase()
        const isActive =tabLink
          ? normalizedPath.endsWith('/' + tabLink) || normalizedPath.includes('/' + tabLink + '/')
          : normalizedPath === '/credit-decision'

        return (
          <Link
            to={tab.link}
            key={tab.link}
            className={`flex-1 text-center py-2 transition relative ${
              isActive ? 'text-black font-bold' : 'text-gray-500'
            }`}
          >
            {tab.title}
            {isActive && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-teal-600 rounded-t"></span>
            )}
          </Link>
        )
      })}
    </div>
  )
}

export default LinksTabs
