import React from 'react'
import DashboardDetailView from '../../../components/dashboard/DashboardDetailView'
import withAuth from '@/hoc/withAuth'

const page = async () => {

  return (
    <DashboardDetailView />
  )
}

export default withAuth(page)