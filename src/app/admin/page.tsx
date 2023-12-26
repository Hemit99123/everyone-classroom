'use client'

import React, {useEffect, useState} from 'react'
import { useSession } from "next-auth/react"
import AdminPortal from '@/components/AdminPortal'
import {useRouter} from 'next/navigation'

const Admin = () => {
  const { data: session, status }: any = useSession();
  const router = useRouter()
  const [classroom, setClassroom] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/classroom/email');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setClassroom(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Only fetch data if the user is authenticated
    if (status === 'authenticated') {
      fetchData();
    } else if (status === 'unauthenticated') {
      // Redirect to the login page if the user is not authenticated
      router.replace('/login');
    }
  }, [status]); // Include 'status' in the dependency array to re-run the effect when the authentication status changes

  return (
    <div>
      {session?.user.isAdmin
        ? <AdminPortal classroomData={classroom} />
        : <span>you are not allowed to see this page</span>
      }
      
    </div>
  );
}

export default Admin;
