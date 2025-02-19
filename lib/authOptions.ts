import { ErrorHandler } from "@/helpers/error";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnector } from "./db";
import { userModel } from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userName: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },

      async authorize(credentials: any) {
        try {
          const { userName, email, password } = credentials;

          if (!userName || !email || !password) {
            throw new ErrorHandler(404, "Please enter all fields");
          }

          await dbConnector();

          const isUser = await userModel.findOne({ email: email });
          if (!isUser) {
            throw new ErrorHandler(400, "User Not Found");
          }

          const isMatched = await bcrypt.compare(password, isUser.password);
          if (!isMatched) {
            throw new ErrorHandler(400, "Invalid email or password");
          }
          return {
            id: isUser._id.toString(),
            userName: isUser.userName,
            email: isUser.email,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge : 30 * 24 * 60 * 60,
  },
  secret : process.env.NEXTAUTH_SECRET,
  pages : {
    signIn : "/login",
    error : "/login",
  }
};
