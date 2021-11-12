import { request } from "./lib/api";
import { logInMutation } from "./lib/graphqlQueries";
import PageHeader from "./PageHeader";
import useForm from "./useForm";
import "./LogIn.css";


function LogIn(props) {
  const { values, handleChange, handleSubmit, disabled } = useForm(handleLogin);

  async function handleLogin() {
    try {
      const data  = await request(logInMutation, {...values});
        
      localStorage.setItem("token", data.login.token);
    } catch (error) {
      console.log("Error: " + error);
    }

    props.onLogIn();
  }

  function handleClick() {
    props.onClose();
    props.onClick();
  }
  
  return (
    <div className="log-in">
      <PageHeader 
        title="Log In"
        link="sign-up"
        onClick={handleClick}
      />
      <form className="log-in-form" onSubmit={handleSubmit}>
        <input 
          className="email-input"
          name="email"
          placeholder="Email"
          required
          type="email" 
          value={values.email} 
          onChange={handleChange} 
        />
        <input 
          className="password-input"
          name="password"
          placeholder="Password"
          required
          type="password" 
          value={values.password} 
          onChange={handleChange} 
        />
        <input disabled={disabled} type="submit" value="Log In" />
      </form>
    </div>
  )
};

export default LogIn;