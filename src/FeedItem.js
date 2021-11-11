import { GraphQLClient, gql } from "graphql-request";
import moment from 'moment';
import { useState } from "react";

import checkmark from './images/checkmark.svg';
import thumbsUp from './images/thumbsUp.svg';
import './FeedItem.css';

export default function FeedItem(props) {
  const [isUpVoted, setIsUpVoted] = useState(false);
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
    
    setIsUpVoted(true);
    props.onUpVote(props.id);
  }
  
  const voteCountClassName = isUpVoted ? 'up-voted-vote-count' : 'vote-count';
  const voteIconClassName = isUpVoted ? 'vote-icon' : 'vote-icon-with-low-opacity';
  const voteStatusIcon = isUpVoted ? checkmark : thumbsUp;
  const voteStatusAltText = isUpVoted ? 'checkmark' : 'thumbs up';

  return (
    <li className="item">
      <div className="item-number">{props.number}</div>
      <div className="item-text"> 
        <h2 className="description">{props.description}</h2>
        <p className="url">{props.url}</p>
        <p 
          className="votes-and-created-at"
        >
          <span className={voteCountClassName}>{props.votes}</span> votes by&nbsp; 
          {props.postedBy.name}&nbsp; 
          {moment(props.createdAt).fromNow()}
        </p>
      </div>
      <button 
        className="vote-button" 
        disabled={props.disabled} 
        onClick={handleClick}>
          <img className={voteIconClassName} 
            src={voteStatusIcon} 
            alt={voteStatusAltText} 
          />
      </button>
    </li>
  )
}