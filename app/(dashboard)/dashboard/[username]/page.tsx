import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { Text } from '@mantine/core'

const Dashboard = async ({ params }: { params: { username: string }}) => {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') redirect('/')
  return (
    <div>
      <p>{session.user.name}</p>
    </div>
  )
}


export default Dashboard