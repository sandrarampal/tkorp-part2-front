import { ApolloClient, InMemoryCache } from "@apollo/client";

const getClient = () => {
  return new ApolloClient({
    uri: "http://localhost:3000/graphql", // L'URL de votre serveur GraphQL
    cache: new InMemoryCache(),
  });
};

export default getClient;
