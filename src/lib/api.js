import { GraphQLClient } from "graphql-request";

const API_URL = 'http://localhost:4000/';
const graphQLClient = new GraphQLClient(API_URL);
const graphQLClientWithAuthHeader = new GraphQLClient(API_URL, {
  headers: {
    authorization: 'Bearer ' + localStorage.getItem('token'),
  },
});

export const request = (query, variables = {}) => {
  const data = graphQLClient.request(query, variables);

  return data;
};

export const requestWithAuth = (query, variables) => {
  const data  = graphQLClientWithAuthHeader.request(query, variables)
  
  return data;
};