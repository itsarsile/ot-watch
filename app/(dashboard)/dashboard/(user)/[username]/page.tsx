import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const Dashboard = async ({ params }: { params: { username: string }}) => {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/')
  return (
    <div>
    </div>
  )
}


export default Dashboard