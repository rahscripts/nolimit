import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";


export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",

            async authorize(credentials) {
                await db();

                const {email, password} = credentials;

                const user = await User.findOne({email});
                if (!user) return null;

                const match = await bcrypt.compare(password, user.password);

                if (!match) return null;


                return {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                };
            },
        }),
    ],

    pages: {
        signIn: "/login",
    }, 

    callbacks: {
        async jwt({token, user}) {
            if (user) token.id = user.id;
            return token;
        },
        
        async session ( { session, token }) {
            session.user.id = token.id;
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST};