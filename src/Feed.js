import { GraphQLClient, gql } from "graphql-request";
import React, { useState, useEffect } from 'react';

import Modal from './Modal/Modal';
import AddLink from './AddLink';
import AddLinkButton from './AddLinkButton';
import FeedItem from "./FeedItem";
import LogIn from './LogIn';
import PageHeader from "./PageHeader";
import SignUp from './SignUp';
import './Feed.css';

function Feed(props) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [feed, setFeed] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? 
    true : false);
  const pageHeaderLink = isLoggedIn ? 'Log Out' : 'Log In';  
  
  const query = gql`
    query {
      feed {
        id
        url 
        description
        votes
        createdAt
        postedBy {
          name
        }
      }
    }
  `
  const API_URL = 'http://localhost:4000/';
  const graphQLClient = new GraphQLClient(API_URL);
  
  useEffect(async () => {
    const data = await graphQLClient.request(query)
  
    const feed = data.feed.sort((a, b) => b.votes - a.votes)
    setFeed(feed);
  }, []);
  
  if (error) return <h1>Someting went wrong!</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  
  function handleLogIn() {
    setIsLoggedIn(true);
  }
  function handleLogOut() {
    setIsLoggedIn(false);
  }
  function setModalComponent(component) {
    setShowModal(true);
    setModalContent(component);
  }
  function handleUpVote(id) {
    const newFeed = feed.map((feedItem) => {
      if (feedItem.id === id) {
        const updatedFeedItem = {
          ...feedItem,
          votes: feedItem.votes + 1,
        }
        return updatedFeedItem;
      }
      return feedItem;
    });
    setFeed(newFeed);
  }

  return (
    <>
      <PageHeader
        title={"Feed"}
        link={pageHeaderLink}
        onLogOut={handleLogOut}
        onClick={() => setModalComponent(
          <LogIn 
            onLogIn={handleLogIn}
            onClick={() => setModalComponent(<SignUp onClose={() => setShowModal(false)} />)} 
            onClose={() => setShowModal(false)} />
        )}
      />
      <ul className="feed">
        {feed && feed.map((feedItem, index) => 
          <FeedItem 
            key={feedItem.id}
            id={feedItem.id}
            number={index + 1}
            url={feedItem.url}
            description={feedItem.description}
            votes={feedItem.votes}
            createdAt={feedItem.createdAt}
            postedBy={feedItem.postedBy}
            onUpVote={(id) => handleUpVote(id)}
            disabled={!isLoggedIn}
          />
        )}
      </ul>
      <AddLinkButton 
        disabled={!isLoggedIn}
        onClick={() => setModalComponent(<AddLink onClose={() => setShowModal(false)} />)} 
      />
    
      <Modal onClose={() => setShowModal(false)} show={showModal}>
        {modalContent}
      </Modal>  
    </>
  )
}

export default Feed;