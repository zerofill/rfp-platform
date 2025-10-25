// FIX: Implement the ContractorView to conditionally render the ProfileWizard or Dashboard based on profile completeness.
import React from 'react';
import { useProfile } from '../hooks/useProfile';
import ProfileWizard from './ProfileWizard';
import Dashboard from './Dashboard';

const ContractorView: React.FC = () => {
  const { schema, profile, updateProfile, completeness } = useProfile();

  if (completeness < 100) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <ProfileWizard
          schema={schema}
          initialProfile={profile}
          completeness={completeness}
          onComplete={updateProfile}
        />
      </div>
    );
  }

  return <Dashboard />;
};

export default ContractorView;
