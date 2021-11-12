import moment from 'moment';
import { useState } from "react";

import checkmark from "./images/checkmark.svg";
import thumbsUp from "./images/thumbsUp.svg";
import { request } from "./lib/api";
import { upVoteMutation } from "./lib/graphqlQueries";
import "./FeedItem.css";


function FeedItem(props) {
  const [isUpVoted, setIsUpVoted] = useState(false);
  
  async function handleClick() {
    try {
      await request(upVoteMutation, {id: props.id});
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
};

export default FeedItem;