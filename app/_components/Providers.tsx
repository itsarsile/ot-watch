'use client'
import { MantineProvider } from '@mantine/core'
import { ReactNode } from 'react'

interface ProvidersProps {
    children: ReactNode
}

export default function Providers({children}: ProvidersProps) {
    return (
           <MantineProvider>
            {children}
           </MantineProvider>
           )
}
