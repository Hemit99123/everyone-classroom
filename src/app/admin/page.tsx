'use client'

import React, {useEffect, useState} from 'react'
import { useSession } from "next-auth/react"
import AdminPortal from '@/components/admin-portal/AdminPortal'
import {useRouter} from 'next/navigation'

const Admin = () => {

  interface TopicProps {
    _id: string;
    title: string;
  }
  const { data: session, status }: any = useSession();
  const router = useRouter()
  const [classroom, setClassroom] = useState<TopicProps[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
        // Redirect to the login page if the user is not authenticated
        router.replace('/login');
    }
  }, [status]); 

  return (
    <div>
      {session?.user.isAdmin
        ? <AdminPortal />
        : <span>you are not allowed to see this page</span>
      }
      
    </div>
  );
}

export default Admin;
