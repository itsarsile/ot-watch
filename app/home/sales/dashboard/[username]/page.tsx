import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { UserCard } from '../_components/user.components'

const Dashboard = async ({ params }: { params: { username: string }}) => {
  const session = await getServerSession(authOptions)
  console.log("🚀 ~ file: page.tsx:9 ~ Dashboard ~ session:", session)
  if (!session || session.user.role !== 'USER') redirect('/')
  return (
    <div>
      <UserCard name={session.user.name}/>
    </div>
  )
}


export default Dashboard