import db from "@wise/db/client"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { credentialsSchema } from "../schemas/src/credentialsSchema";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Phone Number",
      credentials: {
        phone: { label: "Number", type: "number", placeholder: "Phone Number", required: true },
        password: { label: "Password", type: "password", required: true }
      },
      async authorize(credentials) {
        //console.log(credentials);

        if (!credentials || !credentials.phone || !credentials.password) {
          return null;
        }

       /*  const validation = credentialsSchema.safeParse(credentials);

        if (!validation.success) {
          console.log(validation.error);
          return null;
        } */

        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        //console.log(hashedPassword);

        const existingUser = await db.user.findUnique({
          where: {
            number: credentials.phone
          }
        });

        //console.log(existingUser);


        if (existingUser) {
          const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
          console.log(process.env.NEXTAUTH_SECRET);

          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              number: existingUser.number
            }
          }
          return null;
        }

        try {
          console.log("create");

          const user = await db.user.create({
            data: {
              number: credentials.phone,
              password: hashedPassword
            }
          });

          return {
            id: user.id,
            name: user.name,
            number: user.number
          }
        } catch (e) {
          console.log(e);

        }
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret",
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub

      return session;

    }
  }
}