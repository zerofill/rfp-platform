import React from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { Role } from './types';
import PublicView from './components/PublicView';
import ContractorView from './components/ContractorView';
import AdminView from './components/AdminView';

const AppContent: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <PublicView />;
  }

  if (user.role === Role.ADMIN) {
    return <AdminView />;
  }
  
  if (user.role === Role.CONTRACTOR) {
    return <ContractorView />;
  }

  return <div>Error: Unknown user role.</div>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
