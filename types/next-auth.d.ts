import { DefaultUser, User } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";


declare module "next-auth" {
  interface Session {
    user: {
      id: number,
      name: string,
      username: string,
      avatar: string,
      role: string,
      nik: number,
      phone: string,
    }
  }
  interface User extends DefaultUser {
    id: number,
    role: string,
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number,
    username: string,
    name: string,
    role: string
  }
}
