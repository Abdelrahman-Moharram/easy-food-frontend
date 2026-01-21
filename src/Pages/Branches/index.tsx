import React, { useState } from 'react';
import { PageHeader } from '../../Components/ui/Shared';
import { ResourceCard } from '../../Components/ui/Cards';
import { IoLocationOutline, IoCallOutline, IoMailOutline } from 'react-icons/io5';

const Branches = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for demonstration
  const [branches] = useState([
    {
      id: '1',
      name: 'Main Downtown Branch',
      address: '123 Gourmet Ave, Food City, FC 54321',
      phone: '+1 (555) 123-4567',
      email: 'downtown@easyfood.com',
      status: 'active' as const,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000',
    },
    {
      id: '2',
      name: 'Westside Express',
      address: '456 Quick St, Western District, FC 54322',
      phone: '+1 (555) 987-6543',
      email: 'westside@easyfood.com',
      status: 'active' as const,
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1000',
    },
    {
      id: '3',
      name: 'South Bay Bistro',
      address: '789 Coastal Rd, South Bay, FC 54323',
      phone: '+1 (555) 456-7890',
      email: 'southbay@easyfood.com',
      status: 'inactive' as const,
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000',
    },
    {
      id: '4',
      name: 'Central Plaza Food Court',
      address: '101 Mall Cir, Central District, FC 54324',
      phone: '+1 (555) 222-3333',
      email: 'central@easyfood.com',
      status: 'active' as const,
      image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&q=80&w=1000',
    },
  ]);

  const filteredBranches = branches.filter(branch => 
    branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (id: string) => console.log('Edit branch:', id);
  const handleDelete = (id: string) => console.log('Delete branch:', id);
  const handleSettings = (id: string) => console.log('Open settings for branch:', id);
  const handleAddBranch = () => console.log('Add new branch');

  return (
    <div className="min-h-screen bg-neutral-50/50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <PageHeader 
          title="Branches"
          subtitle="Manage your restaurant branches and their settings"
          searchPlaceholder="Search branches..."
          addLabel="Add Branch"
          onSearch={setSearchQuery} 
          onAdd={handleAddBranch} 
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBranches.map(branch => (
            <ResourceCard 
              key={branch.id} 
              id={branch.id}
              name={branch.name}
              image={branch.image}
              status={branch.status}
              details={[
                { icon: <IoLocationOutline />, text: branch.address },
                { icon: <IoCallOutline />, text: branch.phone },
                { icon: <IoMailOutline />, text: branch.email },
              ]}
              actions={{
                onEdit: handleEdit,
                onDelete: handleDelete,
                onSettings: handleSettings
              }}
            />
          ))}
          
          {/* Empty State */}
          {filteredBranches.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="bg-white rounded-2xl p-10 shadow-sm border border-dashed border-neutral-300 inline-block">
                <p className="text-neutral-500 text-lg">{`No branches found matching "${searchQuery}"`}</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-primary font-semibold hover:underline"
                >
                  Clear search
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Branches;

