import { GraphQLClient, gql } from "graphql-request";
import moment from 'moment';

import thumbsUp from './images/thumbsUp.svg';


export default function FeedItem(props) {
  const mutation = gql`
    mutation upVote($id: ID!) {
      upvote(id: $id) {
        id
        votes
      }
    }
  `
  const API_URL = 'http://localhost:4000/';
  const graphQLClient = new GraphQLClient(API_URL);
  const variables = {id: props.id};    

  async function handleClick() {
    try {
      const data  = await graphQLClient.request(mutation, variables)
    } catch (error) {
      console.log("Error: " + error);
    }
    
    props.onUpVote(props.id);
  }
  
  return (
    <li>
      <div>{props.number}</div>
      <h2>{props.description}</h2>
      <p>{props.url}</p>
      <p>{props.votes} votes by {props.postedBy.name} {moment(props.createdAt).fromNow()}</p>
      <button disabled={props.disabled} onClick={handleClick}><img src={thumbsUp} alt="thumbs up" /></button>
    </li>
  )
}