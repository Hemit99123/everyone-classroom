import React from 'react';
import Dashboard from '@/components/dashboard/DashboardView';
import withAuth from '@/hoc/withAuth';

const Page = async () => {

  return (
    <Dashboard />
  );
}

export default withAuth(Page);
