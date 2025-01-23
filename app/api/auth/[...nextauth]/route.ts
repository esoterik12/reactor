import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    async signIn({ user }) {
      // Check if the email domain matches
      const allowedDomain = 'bigbyte.com.tw'
      if (
        user.email?.endsWith(`@${allowedDomain}`) ||
        user.email?.endsWith(`@gmail.com`)
      ) {
        return true // Allow
      } else {
        return '/unauthorized' // Reject
      }
    }
  }
})

export { handler as GET, handler as POST }
