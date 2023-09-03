import React from 'react'

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