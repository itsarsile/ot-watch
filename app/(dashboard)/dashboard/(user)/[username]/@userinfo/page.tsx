import React from 'react'
import { UserCards } from './_components/cards.components'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import 'dotenv/config'
async function getUserData(userId: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`)
  if (!res.ok) {
    return <div>Anda belum log in</div>
  }
  return res.json()
}

async function UserInfo() {
  const session = await getServerSession(authOptions)
  const userId = session?.user.id
  const user = await getUserData(Number(userId))

  return (  
    <UserCards userData={user}/>
  )
}

export default UserInfo