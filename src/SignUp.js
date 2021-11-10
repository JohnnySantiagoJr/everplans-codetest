import { GraphQLClient, gql } from "graphql-request";
import { useState } from 'react';

import PageHeader from "./PageHeader";
import useForm from './useForm';

export default function SignUp(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { values, handleChange, handleSubmit, disabled } = useForm(handleSignUp);
  
  const mutation = gql`
    mutation SignUp($name: String!, $email: String!, $password: String!) {
      signup(name: $name, email: $email, password: $password) {
        token
        user {
          id
        }
      }
    }
  `
  
  const API_URL = 'http://localhost:4000/';
  const graphQLClient = new GraphQLClient(API_URL);
  const variables = {...values};

  async function handleSignUp() {
    try {
      const data  = await graphQLClient.request(mutation, variables)
        localStorage.setItem('token', data.signup.token);
    } catch (error) {
      console.log("Error: " + error);
    }
    
    props.onClose();
  }
  
  return (
    <>
      <div onClick={props.onClose}>X</div>
      <PageHeader title="Sign Up" />
      <form onSubmit={handleSubmit}>
      <label>
        Name
        <input 
          name="name"
          required
          type="text"  
          value={values.name} 
          onChange={handleChange} 
        />
        </label>
        <label>
          Email
          <input 
            name="email"
            required
            type="email" 
            value={values.email} onChange={handleChange}
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
        <input 
          disabled={disabled} 
          type="submit" 
          value={isLoading ? "Signing Up..." : "Sign Up"} 
        />
        {error && <h1>Someting went wrong!</h1>}
      </form>
    </>
  )
}