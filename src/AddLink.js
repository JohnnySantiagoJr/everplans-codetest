import { GraphQLClient, gql } from "graphql-request";
import { useState } from 'react';

import PageHeader from "./PageHeader";
import useForm from './useForm';

export default function AddLink(props) {
  const { values, handleChange, handleSubmit } = useForm(handlePost);
  
  const mutation = gql`
    mutation post($url: String!, $description: String!) {
      post(url: $url, description: $description) {
        id
      }
    }
  `
  
  const API_URL = 'http://localhost:4000/';
  const graphQLClient = new GraphQLClient(API_URL, {
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });
  const variables = {...values};

  async function handlePost() {
    try {
      const data  = await graphQLClient.request(mutation, variables)
    } catch (error) {
      console.log("Error: " + error);
    }

    window.location.reload(true);
    props.onClose();
  }

  return (
    <>
      <PageHeader title="Got something to post?" />
      <form onSubmit={handleSubmit}>
        <label>
          URL
          <input 
            name="url" 
            required
            type="url" 
            value={values.url} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Title
          <input 
            name="description" 
            required
            type="text" 
            value={values.description} 
            onChange={handleChange} />
        </label>
        <input type="submit" value="Post" />
        <div onClick={props.onClose}>Cancel</div>
      </form>
    </>
  )
}