import AddLinkButton from './AddLinkButton';
import FeedItem from "./FeedItem";
import PageHeader from "./PageHeader";

export default function Feed(props) {
  const feed = [
    {
      "url": "https://giphy.com/gifs/computer-cat-wearing-glasses-VbnUQpnihPSIgIXuZv",
      "description": "Professor Cat",
      "votes": 20,
      "createdAt": "2021-11-04T23:38:39.744Z",
      "postedBy": {
        "name": "alice"
      }
    },
    {
      "url": "https://giphy.com/gifs/reddit-doing-lJNoBCvQYp7nq",
      "description": "I have no idea what i am doing",
      "votes": 0,
      "createdAt": "2021-11-04T23:38:39.750Z",
      "postedBy": {
        "name": "alice"
      }
    },
    {
      "url": "https://giphy.com/gifs/facepalm-yFQ0ywscgobJK",
      "description": "Sleepy Cat",
      "votes": 0,
      "createdAt": "2021-11-04T23:38:39.798Z",
      "postedBy": {
        "name": "steve"
      }
    },
  ] 
  
  return (
    <>
      <PageHeader
        title={"Feed"}
        link={"Log Out"}
      />
      <ul>
        {feed.map((feedItem) => 
          <FeedItem 
            url={feedItem.url}
            description={feedItem.description}
            votes={feedItem.votes}
            createdAt={feedItem.createdAt}
            postedBy={feedItem.postedBy}
          />
        )}
      </ul>
      <AddLinkButton />
    </>
  )
}