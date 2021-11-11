import { GraphQLClient, gql } from "graphql-request";
import moment from 'moment';

import thumbsUp from './images/thumbsUp.svg';
import './FeedItem.css';

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
    <li className="item">
      <div className="item-number">{props.number}</div>
      <div className="item-text"> 
        <h2 className="description">{props.description}</h2>
        <p className="url">{props.url}</p>
        <p className="votes-and-created-at">{props.votes} votes by {props.postedBy.name} {moment(props.createdAt).fromNow()}</p>
      </div>
      <button className="vote-button" disabled={props.disabled} onClick={handleClick}><img className="vote-icon" src={thumbsUp} alt="thumbs up" /></button>
    </li>
  )
}