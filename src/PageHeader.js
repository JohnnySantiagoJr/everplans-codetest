import { Link } from 'react-router-dom';

import './PageHeader.css';

function PageHeader(props) {
  let link;

  if (props.link === 'log-in') {
    link = <Link className="link" to="/log-in">Log In</Link>;
  } else if (props.link === 'log-out') {
    link = <Link className="link" onClick={props.onLogOut} to="/">Log Out</Link>;
  } else {
    link = <Link className="link" to="/sign-up">Sign Up</Link>;
  }

  return (
    <div className="page-header">
      <h1 className="title">{props.title}</h1>
      {link}
    </div>
  )
};

export default PageHeader;