import React from 'react'
import Button from '../../ui/Common/Button'
import { Input } from '../../ui/Forms'

const MenuForm = () => {
  return (
    <div className="sticky top-8 space-y-6">
        
        {/* Header for Admin */}
        <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-8 bg-neutral-900"></div>
            <h2 className="text-xl font-bold uppercase tracking-wide text-neutral-800">Kitchen Manager</h2>
        </div>

        {/* 1. SECTION CREATOR */}
        <div className="bg-white p-6 shadow-lg border border-neutral-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">Step 1: Create Category</h3>
            <form onSubmit={()=>{}} className="grid grid-cols-3 gap-2">
            {/* <input
                type="text"
                placeholder="e.g. Desserts"
                value={"e.g. Desserts"}
                // onChange={(e) => setSectionTitle(e.target.value)}
                className="bg-neutral-50 border border-neutral-300 p-3 text-sm focus:outline-none focus:border-neutral-900 transition-colors"
            /> */}
                <div className="col-span-2">
                    <Input 
                        labelId='meal_name'
                        onChange={()=>{}}
                        type='text'
                        value={''}
                        required
                        inputClassName=''
                    />
                </div>
                {/* <button type="submit" className="bg-neutral-900 text-white px-4 text-sm hover:bg-neutral-700 transition-colors">
                    ADD
                </button> */}
                <Button 
                    title='ADD'
                    variant='black'
                    // className='text-sm'
                />
            </form>
        </div>

        {/* 2. ITEM CREATOR */}
        <div className="bg-white p-6 shadow-lg border border-neutral-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-neutral-100 -mr-8 -mt-8 rounded-full"></div>
            
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4 relative z-10">Step 2: Add Dish</h3>
            
            <form onSubmit={()=>{}} className="space-y-4 relative z-10">
            {/* Category Select */}
            <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Category</label>
                <select

                    className="w-full bg-neutral-50 border border-neutral-300 p-3 text-sm focus:outline-none focus:border-neutral-900"
                    required
                >
                <option value="">Select Category...</option>
                
                </select>
            </div>

            {/* Name & Price Row */}
            <div className="flex gap-3">
                <div className="w-2/3">
                <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Dish Name</label>
                <input
                    type="text"
                    placeholder="e.g. Steak"
                    
                    className="w-full bg-neutral-50 border border-neutral-300 p-3 text-sm focus:outline-none focus:border-neutral-900"
                />
                </div>
                <div className="w-1/3">
                <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Price</label>
                <input
                    type="number"
                    placeholder="0.00"

                    className="w-full bg-neutral-50 border border-neutral-300 p-3 text-sm focus:outline-none focus:border-neutral-900"
                />
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Description</label>
                <textarea
                rows={3}
                placeholder="Ingredients..."

                className="w-full bg-neutral-50 border border-neutral-300 p-3 text-sm focus:outline-none focus:border-neutral-900"
                ></textarea>
            </div>

            <button 
                type="submit" 
                // disabled={menu.sections.length === 0}
                className="w-full py-3 bg-neutral-900 shadow-md text-white font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
            >
                Add Item to Menu
            </button>
            </form>
        </div>

    </div>
  )
}

export default MenuForm
