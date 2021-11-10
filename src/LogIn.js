import { GraphQLClient, gql } from "graphql-request";
import { useState } from 'react';

import PageHeader from "./PageHeader";
import useForm from './useForm';

export default function LogIn(props) {
  const { values, handleChange, handleSubmit, disabled } = useForm(handleLogin);

  const mutation = gql`
    mutation LogIn($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          email
          links {
            url
            description
          }
        }
      }
    }
  `
  const API_URL = 'http://localhost:4000/';
  const graphQLClient = new GraphQLClient(API_URL);  
  const variables = {...values};

  async function handleLogin() {
    try {
      const data  = await graphQLClient.request(mutation, variables)
        
      localStorage.setItem('token', data.login.token);
    } catch (error) {
      console.log("Error: " + error);
    }

    props.onLogIn();
    props.onClose();
  }

  function handleClick() {
    props.onClose();
    props.onClick();
  }
  
  return (
    <>
      <PageHeader 
        title="Log In"
        link="Sign Up"
        onClick={handleClick}
      />
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input 
            name="email"
            required
            type="email" 
            value={values.email} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Password
          <input 
            name="password"
            required
            type="password" 
            value={values.password} 
            onChange={handleChange} 
          />
        </label>
        <input disabled={disabled} type="submit" value="Log In" />
      </form>
    </>
  )
};