import { ApolloClient, InMemoryCache } from "@apollo/client";

const getClient = () => {
  return new ApolloClient({
    uri: "https://site--tkorp-part1-api--96jcjn4jx467.code.run/graphql", // L'URL de votre serveur GraphQL
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'cache-first',
      },
      query: {
        fetchPolicy: 'network-only',
      },
    },
  });
};

export default getClient;
