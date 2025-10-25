import React from 'react';

const AdminDashboard: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">Welcome to the administration panel. From here, you can manage the core aspects of the RFP platform.</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-gray-700">Schema Builder</h2>
                    <p className="mt-2 text-gray-600">Define and manage the dynamic forms for Contractor Profiles and Project RFPs. Add, edit, and reorder fields without any code changes.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow opacity-50">
                    <h2 className="text-xl font-semibold text-gray-700">Job Management</h2>
                    <p className="mt-2 text-gray-600">Create new jobs, manage their status, invite bidders, and award projects. (Coming Soon)</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow opacity-50">
                    <h2 className="text-xl font-semibold text-gray-700">User Management</h2>
                    <p className="mt-2 text-gray-600">View registered contractors, check their profile completeness, and manage user accounts. (Coming Soon)</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;