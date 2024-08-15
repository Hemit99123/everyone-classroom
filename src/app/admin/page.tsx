import React from 'react'
import AdminPortal from '@/components/admin-portal/AdminPortal'
import withAdminAuth from '@/hoc/withAdminAuth';

const Admin = async () => {

  return (
    <div>
      <AdminPortal />
    </div>
  );
}

export default withAdminAuth(Admin);
