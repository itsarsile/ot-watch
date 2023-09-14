import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

export default function UserAttendancesView() {
  return (
    <div>
        <Card>
            <CardHeader>
                <CardTitle>Jumlah Absen</CardTitle>
                <CardDescription>Absensi terkini</CardDescription>
            </CardHeader>
        </Card>
    </div>
  )
}
