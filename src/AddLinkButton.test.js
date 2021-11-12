import ReactDOM from 'react-dom';
import AddLinkButton from './AddLinkButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddLinkButton />, div);
});