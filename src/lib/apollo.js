import fetch from 'node-fetch';
import ApolloClient from 'apollo-boost';

export default new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql',
  fetch,
});
