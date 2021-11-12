import ReactDOM from 'react-dom';
import AddLink from './AddLink';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddLink />, div);
});