interface Props{
    title?:string,
    children: React.ReactNode
}

const Page = ({title, children}:Props) => {
  return (
    <main>
        {
        title?
          <div className="py-5 text-center bg-[#00A69C]">
            <h1 className='font-bold text-white'>{title}</h1>
          </div>
        :null
        }
      {children}
    </main>
  )
}

export default Page
