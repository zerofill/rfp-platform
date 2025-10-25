import React, { useState } from 'react';
import AdminSidebar from './admin/AdminSidebar';
import AdminDashboard from './admin/AdminDashboard';
import SchemaBuilder from './admin/SchemaBuilder';
import JobManager from './admin/JobManager';
import UserManager from './admin/UserManager';

const AdminView: React.FC = () => {
    const [currentView, setCurrentView] = useState('dashboard');

    const renderContent = () => {
        switch (currentView) {
            case 'dashboard':
                return <AdminDashboard />;
            case 'schema':
                return <SchemaBuilder />;
            case 'jobs':
                return <JobManager />;
            case 'users':
                return <UserManager />;
            default:
                return <AdminDashboard />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar currentView={currentView} setView={setCurrentView} />
            <main className="flex-grow p-8">
                {renderContent()}
            </main>
        </div>
    );
};

export default AdminView;
