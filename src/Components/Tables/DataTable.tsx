import React from 'react'
import EmptyContent from '../Common/EmptyContent';
import { beautify_date, numberToMoney } from '../utils/helper';
import TableSkeleton from './TableSkeleton';
import { RiyalFont } from '../utils/Icons';
import { Tooltip } from "react-tooltip";

interface Props{
    data
    options?:(row)=>React.ReactNode
    isLoading:boolean
    isOptions?:boolean,
    emptyLinkHref: string
    emptyText: string,
    startOptions?:(row)=>React.ReactNode,
    fnKeys:string[]
    optionsHeader?:string
    startOptionsHeader?:string,
    amounts?:string[],
    dates?:string[],
    showCounter?:boolean
}


const DataTable = ({options, startOptions, data, isLoading, emptyLinkHref, amounts, dates, fnKeys, isOptions=false, optionsHeader,  startOptionsHeader, showCounter}:Props) => {
    const getHeaders = () =>{
        const cols = []
        if(startOptions?.length){
            cols.push(<th key={0}>{startOptionsHeader}</th>)
        }
        if (data?.length > 0){
            for(const i in data[0]){
                if(!fnKeys || !fnKeys.includes(i))
                    cols.push(i)
            }
        }
        if(options?.length){
            cols.push(<th key={-1}>{optionsHeader}</th>)
        }
        return cols
    }
    
    const showCellWithOverLay = (cellContent: any) => {
                
        if(typeof(cellContent) !== 'string' || cellContent.length < 70)
            return cellContent
        
        const modifiedValue = cellContent.slice(0, 70) + " ...";
        const cellId        = String(Math.random()*1000)

        return (
            <div>
                <div
                    data-tooltip-id={cellId}
                    data-tooltip-content={cellContent}
                    className="cursor-default large-table-cell"
                >
                    {modifiedValue}
                </div>
                <Tooltip id={cellId} variant="dark" />
            </div>
        );
    };
    
    const renderRow = ({row}:{row})=>{
        const rendered_row = []
        for(const cell in row){
            if(typeof row === 'object' && Object.keys(row).includes(cell) && (!fnKeys || !fnKeys.includes(cell))){
                rendered_row.push(<td className="border border-gray-200 whitespace-nowrap px-4 py-2 ">{amounts?.includes(cell)?<>{numberToMoney(row[cell])}<RiyalFont height='18' width='12' /></> : dates?.includes(cell)?beautify_date(row[cell]): showCellWithOverLay(row[cell]) ||<span className='text-center block'>-</span>}</td>)
            }
        }
        return rendered_row
    }
    
  return (
    <div className="overflow-x-auto overflow-y-hidden  rounded-lg">
        {
            isLoading?
                <TableSkeleton />
            :
                data?.length?
                    <table className="w-full text-center">
                          <thead className=''>

                            <tr className='  text-center bg-[#0b3b6e] text-white'>
                                {
                                    showCounter?
                                        <th className='py-2 mx-2'></th>
                                    :null
                                }
                                {
                                    getHeaders()?.map((col, idx)=>(
                                        <th key={idx} className="border border-gray-200 whitespace-nowrap px-4 py-4 font-bold">{col}</th>
                                    ))
                                }
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {
                                data?.map((row, index:number)=>(
                                        <tr key={index+"-"+String(Math.random()*200)}>
                                            {
                                                isOptions && startOptions?
                                                    <td className="border border-gray-200 whitespace-nowrap px-4 py-2">
                                                        {startOptions(row)}
                                                    </td>
                                                :null
                                            }
                                            {
                                                showCounter?
                                                    <td className='border border-gray-200  mx-2'>{index+1}</td>
                                                :null
                                            }
                                            {
                                                renderRow({row})
                                            }
                                            {
                                                isOptions && options?
                                                    <td className="border border-gray-200 whitespace-nowrap px-4 py-2">
                                                        <div className=" flex justify-center">
                                                            {options(row)}
                                                        </div>
                                                    </td>
                                                :null
                                            }
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                :
                <div className="flex justify-center">
                    <EmptyContent 
                        href={emptyLinkHref}
                        // title={emptyText}
                    />
                </div>
        }
    </div>
  )
}

export default DataTable
