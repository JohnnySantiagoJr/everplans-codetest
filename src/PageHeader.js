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
    <>
      <h1>{props.title}</h1>
      {props.link && <div onClick={handleClick}>{props.link}</div>}
    </>
  )
}

export default PageHeader;