import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins"

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("legaleasy");

export const auth = betterAuth({
    session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            maxAge: 7 *24 * 60 * 60, // 7 days
            refreshCache: false // Disable stateless refresh
        }
    },
    plugins: [
        jwt(), 
    ],
    user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "client",
      },
    },
  },
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },


    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client
    }),
});