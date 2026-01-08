import React, { useState } from 'react';

const ProfessionalMenuBuilder = () => {
  // --- STATE ---
  const [menu, setMenu] = useState([
    { 
      id: 1, 
      title: 'Appetizers', 
      items: [
        { name: 'Truffle Arancini', price: '14', desc: 'Risotto balls, black truffle oil, parmesan dust.' },
        { name: 'Beef Carpaccio', price: '18', desc: 'Thinly sliced raw beef, capers, olive oil, lemon.' }
      ] 
    },
    { 
      id: 2, 
      title: 'Main Courses', 
      items: [
        { name: 'Pan Seared Salmon', price: '32', desc: 'Asparagus risotto, lemon butter sauce.' }
      ] 
    }
  ]);

  const [sectionTitle, setSectionTitle] = useState('');
  const [itemForm, setItemForm] = useState({
    sectionId: '',
    name: '',
    price: '',
    desc: ''
  });

  // --- HANDLERS ---
  const addSection = (e) => {
    e.preventDefault();
    if (!sectionTitle) return;
    setMenu([...menu, { id: Date.now(), title: sectionTitle, items: [] }]);
    setSectionTitle('');
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!itemForm.sectionId || !itemForm.name) return;

    const updatedMenu = menu.map(section => {
      if (section.id.toString() === itemForm.sectionId) {
        return { 
          ...section, 
          items: [...section.items, { ...itemForm }] 
        };
      }
      return section;
    });

    setMenu(updatedMenu);
    setItemForm({ ...itemForm, name: '', price: '', desc: '' }); // keep section selected
  };

  return (
    <div className="min-h-screen bg-neutral-100 p-8 font-sans text-neutral-800">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* --- LEFT SIDE: THE MENU PREVIEW (2/3) --- */}
        <div className="lg:col-span-2">
          {/* Paper Container */}
          <div className="bg-white min-h-[800px] shadow-2xl p-12 md:p-16 relative">
            
            {/* Decorative Border/Frame */}
            <div className="absolute inset-4 border border-double border-neutral-200 pointer-events-none"></div>

            {/* Header */}
            <div className="text-center mb-16 relative z-10">
              <h1 className="font-serif text-5xl font-bold tracking-wider text-neutral-900 mb-2 uppercase">
                Le Bistro
              </h1>
              <p className="text-xs tracking-[0.3em] text-neutral-400 uppercase">Fine Dining & Cocktails</p>
            </div>

            {/* Menu Content */}
            <div className="space-y-12 max-w-2xl mx-auto relative z-10">
              {menu.length === 0 && (
                <div className="text-center text-neutral-300 py-20 italic font-serif">
                  Menu is currently empty...
                </div>
              )}

              {menu.map((section) => (
                <div key={section.id}>
                  {/* Section Title */}
                  <h2 className="font-serif text-2xl text-center text-neutral-800 uppercase tracking-widest mb-6 border-b border-neutral-200 pb-2 mx-10">
                    {section.title}
                  </h2>

                  {/* Items Grid */}
                  <div className="space-y-6">
                    {section.items.map((item, idx) => (
                      <div key={idx} className="group">
                        <div className="flex items-end justify-between w-full">
                          {/* Name */}
                          <span className="font-bold text-neutral-800 text-lg whitespace-nowrap">
                            {item.name}
                          </span>
                          
                          {/* Dotted Leader Line */}
                          <span className="flex-grow border-b-2 border-dotted border-neutral-300 mx-2 mb-1 opacity-50"></span>
                          
                          {/* Price */}
                          <span className="font-serif font-bold text-lg text-neutral-900">
                            {item.price}
                          </span>
                        </div>
                        
                        {/* Description */}
                        <p className="text-sm text-neutral-500 italic mt-1 font-serif pr-12">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                    {section.items.length === 0 && (
                      <p className="text-center text-xs text-neutral-300 uppercase tracking-widest">No items yet</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-20 text-center relative z-10">
              <p className="text-[10px] uppercase tracking-widest text-neutral-400">
                123 Culinary Ave, Food City • Established 2024
              </p>
            </div>

          </div>
        </div>

        {/* --- RIGHT SIDE: EDITOR TOOLS (1/3) --- */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            
            {/* Header for Admin */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-8 bg-neutral-900"></div>
              <h2 className="text-xl font-bold uppercase tracking-wide text-neutral-800">Kitchen Manager</h2>
            </div>

            {/* 1. SECTION CREATOR */}
            <div className="bg-white p-6 shadow-lg border border-neutral-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">Step 1: Create Category</h3>
              <form onSubmit={addSection} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Desserts"
                  value={sectionTitle}
                  onChange={(e) => setSectionTitle(e.target.value)}
                  className="flex-grow bg-neutral-50 border border-neutral-300 p-3 text-sm focus:outline-none focus:border-neutral-900 transition-colors"
                />
                <button type="submit" className="bg-neutral-900 text-white px-4 text-sm hover:bg-neutral-700 transition-colors">
                  ADD
                </button>
              </form>
            </div>

            {/* 2. ITEM CREATOR */}
            <div className="bg-white p-6 shadow-lg border border-neutral-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-neutral-100 -mr-8 -mt-8 rounded-full"></div>
              
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4 relative z-10">Step 2: Add Dish</h3>
              
              <form onSubmit={addItem} className="space-y-4 relative z-10">
                {/* Category Select */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Category</label>
                  <select
                    value={itemForm.sectionId}
                    onChange={(e) => setItemForm({ ...itemForm, sectionId: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-300 p-3 text-sm focus:outline-none focus:border-neutral-900"
                    required
                  >
                    <option value="">Select Category...</option>
                    {menu.map((s) => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                </div>

                {/* Name & Price Row */}
                <div className="flex gap-3">
                  <div className="w-2/3">
                    <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Dish Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Steak"
                      value={itemForm.name}
                      onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 p-3 text-sm focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                  <div className="w-1/3">
                    <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Price</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={itemForm.price}
                      onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 p-3 text-sm focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Description</label>
                  <textarea
                    rows="3"
                    placeholder="Ingredients..."
                    value={itemForm.desc}
                    onChange={(e) => setItemForm({ ...itemForm, desc: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-300 p-3 text-sm focus:outline-none focus:border-neutral-900"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={menu.length === 0}
                  className="w-full py-3 bg-neutral-900 text-white font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
                >
                  Add Item to Menu
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfessionalMenuBuilder;