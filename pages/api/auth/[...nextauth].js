import NextAuth from "next-auth";
import Providers from "next-auth/providers/credentials";
import axios from "axios";

const api = process.env.NEXT_PUBLIC_API_LOCAL;
const providers = [
  Providers({
    name: "Credentials",
    authorize: async (credentials) => {
      try {
        const userCred = {
          password: credentials.password,
          email: credentials.email,
        };
        // const data = await fetch("http://127.0.0.1:1337/auth/login", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     email: "whosendall@gmail.com",
        //     password: "123qwe",
        //   }),
        // })
        //   .then((r) => r.json())
        //   .then((data) => {
        //     return { status: "success", data: data.data };
        //   });
        return (
          axios
            .post(`http://127.0.0.1:1337/auth/login"`, {
              email: "whosendall@gmail.com",
              password: "123qwe",
            })
            .then((response) => {
              return { status: "success", data: response.data };
            })
            .catch((error) => {
              console.log(error.response);
              throw new Error(error.response.data.message);
            }) || null
        );
        //return { status: "success", data: data.data };
      } catch (e) {
        const errorMessage = e.response.data.message;
        console.log(errorMessage);
        // Redirecting to the login page with error message          in the URL
        throw new Error(errorMessage + "&email=" + credentials.email);
      }
    },
  }),
];

const callbacks = {
  async jwt(token, user) {
    if (user) {
      token.accessToken = user.data.token;
    }

    return token;
  },

  async session(session, token) {
    session.accessToken = token.accessToken;
    return session;
  },
};

const options = {
  providers,
  callbacks,
  pages: {
    error: "/auth/login", // Changing the error redirect page to our custom login page
  },
};

export default (req, res) => NextAuth(req, res, options);
