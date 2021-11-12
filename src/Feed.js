import React, { useState, useEffect } from "react";

import { request } from "./lib/api";
import { getFeedQuery } from "./lib/graphqlQueries";
import Modal from "./Modal/Modal";
import AddLink from "./AddLink";
import AddLinkButton from "./AddLinkButton";
import FeedItem from "./FeedItem";
import PageHeader from "./PageHeader";
import "./Feed.css";

function Feed(props) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [feed, setFeed] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  
  const pageHeaderLink = props.isLoggedIn ? "log-out" : "sign-up";  
    
  useEffect(async () => {
    const data = await request(getFeedQuery);
    
    const feed = data.feed.sort((a, b) => b.votes - a.votes)
    
    setFeed(feed);
  }, []);
  
  if (error) return <h1>Someting went wrong!</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  
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

  function setModalComponent(component) {
    setShowModal(true);
    setModalContent(component);
  }

  return (
    <>
      <PageHeader
        title={"Feed"}
        link={pageHeaderLink}
        onLogOut={props.onLogOut}
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
            disabled={!props.isLoggedIn}
          />
        )}
      </ul>
      <AddLinkButton 
        disabled={!props.isLoggedIn}
        onClick={() => setModalComponent(<AddLink onClose={() => setShowModal(false)} />)} 
      />
    
      <Modal onClose={() => setShowModal(false)} show={showModal}>
        {modalContent}
      </Modal>  
    </>
  )
};

export default Feed;