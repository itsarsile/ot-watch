import React from 'react'
import { AccountCreation } from '../_components/button.components'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const Dashboard = async ({ params }: { params: { username: string }}) => {
  const session = await getServerSession(authOptions)
  console.log("🚀 ~ file: page.tsx:9 ~ Dashboard ~ session:", session)
  if (!session || session.user.role !== 'ADMIN') redirect('/')
  return (
    <div>
      <AccountCreation />
      {/* Dashboard for {params.username} */}
    </div>
  )
}


export default Dashboard