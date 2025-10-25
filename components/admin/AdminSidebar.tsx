import React from 'react';
import { useAuth } from '../../hooks/useAuth';

interface AdminSidebarProps {
  currentView: string;
  setView: (view: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentView, setView }) => {
  const { logout, user } = useAuth();
  
  const navItems = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'schema', label: 'Schema Builder' },
    { key: 'jobs', label: 'Job Management' },
    { key: 'users', label: 'User Management' },
  ];

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <p className="text-sm text-gray-400">{user?.email}</p>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {navItems.map(item => (
          <button
            key={item.key}
            onClick={() => setView(item.key)}
            className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
              currentView === item.key
                ? 'bg-blue-600'
                : 'hover:bg-gray-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full text-left px-4 py-2.5 rounded-md text-sm font-medium hover:bg-red-600 transition-colors flex items-center"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
