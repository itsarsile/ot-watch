import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { Metadata } from 'next';
import { AttendanceListCards, WelcomeCards } from '../_components/cards.components';

export const metadata: Metadata = {
  title: "Home | OpenTable Watch",
};


const Home = async () => {
    const session = await getServerSession(authOptions)
    console.log("🚀 ~ file: page.tsx:8 ~ Home ~ session:", session)
    if (!session) {
        redirect('/')
    }
  return (
    <div className='flex flex-col gap-5'>
      {/* <WelcomeCards name={session.user.name}/> */}
      <AttendanceListCards />
    </div>
  )
}

export default Home