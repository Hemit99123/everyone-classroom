import Register from '@/components/auth/RegisterView'
import React from 'react'
import withoutAuth from '@/hoc/withoutAuth'

const page = () => {
  return (
    <Register />
  )
}

export default withoutAuth(page)