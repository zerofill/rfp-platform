import React from 'react';

const UserManager: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
            <p className="mt-2 text-gray-600">View registered contractors, check their profile completeness, and manage user accounts.</p>

            <div className="mt-8 bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-gray-700">Coming Soon</h2>
                <p className="mt-2 text-gray-600">This feature is currently under development. You will soon be able to manage all platform users from this panel.</p>
            </div>
        </div>
    );
};

export default UserManager;
