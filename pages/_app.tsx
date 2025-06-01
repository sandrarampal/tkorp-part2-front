import type { AppProps } from "next/app";
import Header from "components/shared/Header";
import { ApolloProvider } from "@apollo/client";
import getClient from "lib/apollo-client";

//styles
import "../src/styles/globals.css";

const client = getClient(); // Initialisez votre client Apollo ici

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
