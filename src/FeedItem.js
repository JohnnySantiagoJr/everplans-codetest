import moment from 'moment';

export default function FeedItem({description, url, votes, postedBy,  createdAt}) {
  return (
    <li>
      <h2>{description}</h2>
      <p>{url}</p>
      <p>{votes} votes by {postedBy.name} {moment(createdAt).fromNow()}</p>
    </li>
  )
}