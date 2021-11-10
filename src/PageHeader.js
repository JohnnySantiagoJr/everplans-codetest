import './PageHeader.css';

function PageHeader(props) {
  function handleClick() {
    if (props.link === 'Log Out') {
      localStorage.clear();
      props.onLogOut()
    } else {
      props.onClick();
    }
  }
  
  return (
    <div className="page-header">
      <h1 className="title">{props.title}</h1>
      {props.link && <div className="link" onClick={handleClick}>{props.link}</div>}
    </div>
  )
}

export default PageHeader;