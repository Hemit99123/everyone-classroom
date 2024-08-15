import Login from '@/components/auth/LoginView'
import withoutAuth from '@/hoc/withoutAuth'
import React from 'react'

const page = () => {
  return (
      <Login />
  )
}

export default withoutAuth(page)