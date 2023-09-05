import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - OT Watch'
}

function UserDashboardLayout(props: {
    children: React.ReactNode
    userinfo: React.ReactNode
}) {
  return (
    <>
    {props.children}
    {props.userinfo}
    </>
  )
}

export default UserDashboardLayout