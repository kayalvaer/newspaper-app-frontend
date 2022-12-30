import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { signIn } from "../../../lib/auth";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign In with Email",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        if (credentials == null) return null;
        try {
          const { user, jwt } = await signIn({
            email: credentials.email,
            password: credentials.password,
          });
          return { jwt, ...user };
        } catch (error) {
          console.log(error.response);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token, user }) {
      console.log(session, token, user);
      // session callback is called whenever a session for that particular user is checked
      // in above function we created token.user=user
      session.user = token;
      // you might return this in new version
      return Promise.resolve(session);
    },
    async jwt({ token, user }) {
      console.log(user);
      if (user) {
        token = user;
      }
      return Promise.resolve(token);
    },
  },
};
export default NextAuth(authOptions);
