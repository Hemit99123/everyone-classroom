import React from 'react'
import DashboardDetailView from '../components/DashboardDetailView'
import withAuth from '@/hoc/withAuth'

const page = async () => {

  return (
    <DashboardDetailView />
  )
}

export default withAuth(page)