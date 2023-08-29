import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'

const Home = async () => {
    const session = await getServerSession(authOptions)
    console.log("🚀 ~ file: page.tsx:8 ~ Home ~ session:", session)
    if (!session) {
        redirect('/')
    }
  return (
    <div>Home</div>
  )
}

export default Home