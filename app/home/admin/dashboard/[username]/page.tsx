import React from 'react'
import { Actions } from '../_components/button.components'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { Group } from '@mantine/core'
import { MapsComponents } from '../_components/maps.components'

const Dashboard = async ({ params }: { params: { username: string }}) => {
  const session = await getServerSession(authOptions)
  console.log("🚀 ~ file: page.tsx:9 ~ Dashboard ~ session:", session)
  if (!session || session.user.role !== 'ADMIN') redirect('/')
  return (
    <div>
      <Actions />
    </div>
  )
}


export default Dashboard