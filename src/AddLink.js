import { requestWithAuth } from "./lib/api"
import { postMutation } from "./lib/graphqlQueries";
import useForm from "./useForm";
import "./AddLink.css";


export default function AddLink(props) {
  const { values, handleChange, handleSubmit } = useForm(handlePost);

  async function handlePost() {
    try {
      await requestWithAuth(postMutation, {...values})
    } catch (error) {
      console.log("Error: " + error);
    }

    window.location.reload(true);
    props.onClose();
  }

  return (
    <div className="add-link">
      <h1 className="post-title">Got something to post?</h1>
      <form onSubmit={handleSubmit}>
        <label className="label">
          URL
          <input
            className="input" 
            name="url" 
            required
            type="url" 
            value={values.url} 
            onChange={handleChange} 
          />
        </label>
        <hr className="url-input-line" />
        <label className="label">
          Title
          <input 
            className="input"
            name="description" 
            required
            type="text" 
            value={values.description} 
            onChange={handleChange} />
        </label>
        <hr className="title-input-line" />
        <input className="post-button" type="submit" value="Post" />
        <div className="cancel-button" onClick={props.onClose}>Cancel</div>
      </form>
    </div>
  )
}