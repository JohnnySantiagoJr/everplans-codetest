import ReactDOM from 'react-dom';
import FeedItem from './FeedItem';

const props = {
  number: '1',
  description: 'description',
  url: 'http://example,com',
  votes: 3,
  postedBy: {
    name: 'John',
  },
  createdAt: "2021-11-04T23:38:39.744Z"
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FeedItem {...props} />, div);
});