import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const wsClient = createClient({
  url: process.env.WS_API_URL + "/v1/graphql",
  connectionParams: {
    headers: {
      "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    },
  },
});
// ヘッダーを含んだ websocket リンクを作成
const wsLink = new GraphQLWsLink(wsClient);

// Apollo client を作成
const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
