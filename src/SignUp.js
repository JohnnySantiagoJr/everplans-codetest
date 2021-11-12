import { useState } from 'react';

import { request } from "./lib/api";
import { signUpMutation } from "./lib/graphqlQueries";
import PageHeader from "./PageHeader";
import useForm from "./useForm";
import "./SignUp.css";


export default function SignUp(props) {
  const [error, setError] = useState(null);
  const { values, handleChange, handleSubmit, disabled } = useForm(handleSignUp);
  
  async function handleSignUp() {
    try {
      const data  = await request(signUpMutation, {...values});
        
      localStorage.setItem("token", data.signup.token);
      window.location.href="/";
    } catch (error) {
      console.log("Error: " + error);
      setError(error);
    }
  }
  
  return (
    <>
      <PageHeader title="Sign Up" link="log-in"/>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <input 
          name="name"
          placeholder="Name"
          required
          type="text"  
          value={values.name} 
          onChange={handleChange} 
        />
        <input 
          name="email"
          placeholder="Email"
          required
          type="email" 
          value={values.email} onChange={handleChange}
        />
        <input 
          name="password"
          placeholder="Password"
          required
          type="password"  
          value={values.password} 
          onChange={handleChange} 
        />
        <input 
          disabled={disabled} 
          type="submit" 
          value="Sign Up" 
        />
        {error && <h1>Someting went wrong!</h1>}
      </form>
    </>
  )
}