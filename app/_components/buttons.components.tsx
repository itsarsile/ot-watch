'use client'

import { Button } from "@mantine/core"
import { signIn, signOut } from "next-auth/react"

export const Login = () => {
    return (
        <Button onClick={() => signIn('credentials')}>
            Sign In
        </Button>
    )
}

export const Logout = () => {
    return (
        <Button onClick={() => signOut()}>
            Logout
        </Button>
    )
}