import NextAuth, { type DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import authConfig from "./auth.config"
import { getUserById } from "./data/user"
import { UserRole } from "@prisma/client"

declare module "@auth/core/types" {
  interface User {
    role: "ADMIN" | "USER";
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role: "ADMIN" | "USER";
  }
}


export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks:{

    

    async session({token,session}){
      

        if (token.sub && session.user) {
          session.user.id =token.sub;
        }

        if (token.role && session.user) {
          session.user.role=token.role;
        }
      return session;
    },
    async jwt({token}){
      if (!token.sub) {
        return token
      }

      const existingUser = await getUserById(token.sub);

      if(!existingUser) return token;

      token.role=existingUser.role;

      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})