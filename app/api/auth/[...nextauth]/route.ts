import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();
        // console.log("🚀 ~ file: route.ts:40 ~ authorize ~ user:", user);

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log("🚀 ~ file: route.ts:53 ~ jwt ~ user:", {user, token});

      if (user) {
        const u = user as unknown as any
        
        return {
          ...token,
          id: u.user.id, 
          name: u.user.name,
          username: u.user.username,
          role: u.user.role
        };
      }
      return token;
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      // console.log("🚀 ~ file: route.ts:59 ~ session ~ token:", {token, session});
      return {
        ...session, 
          user: {
            ...session.user,
            id: token.id,
            role: token.role,
            username: token.username,
            name: token.name
          }
        }
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
