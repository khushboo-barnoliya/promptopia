

import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

import userModel from "@models/user";

import { connectDB } from "@utils/db";
import { Profiler } from "react";

const providerHandler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  async session({ session }) {
    const sessionUser = await userModel.findOne({
      email: session.user.email
    })
    session.user.id = sessionUser._id.toString();
    return session;
  },
  async session({ profile }) {
    try {
      await connectDB();

      // check if a user already exists
      const userExists = await userModel.findOne({
        emai: profile.email
      })
      
      // if not, Create a new user
      if(!userExists){
        await userModel.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture

        })
      }

      return true;
    } catch (error) {
      console.log(error)
      return false;

    }
  },
})

export { providerHandler as GET, providerHandler as POST };