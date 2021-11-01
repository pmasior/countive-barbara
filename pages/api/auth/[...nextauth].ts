import NextAuth from "next-auth";
import CredentialsProvider, {
  CredentialInput,
} from "next-auth/providers/credentials";

interface CredentialsInputs {
  username: CredentialInput;
  password: CredentialInput;
}

// const prismaClient;

const nextAuthOptions = {
  providers: [
    CredentialsProvider<{}>({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        // TODO: change to database query
        if (
          credentials &&
          (credentials as CredentialsInputs).username === "pawel" &&
          (credentials as CredentialsInputs).password === " "
        ) {
          return {
            id: 1,
            name: "Paweł",
            email: "pawel@example.com",
          };
        }

        return null;
      },
    }),
  ],
  // TODO: move secret to .env?
  secret: "50edc142845b02ae4dfbd0d5f833a87c8sm4a0864c32d3fe54d63ff195a0af94",
  jwt: {
    encryption: true,
    secret: "bt678ny96r6v9n80m78ntb687NTiwhbfd9IhuLqmpwo",
  },
};

export default NextAuth(nextAuthOptions);
