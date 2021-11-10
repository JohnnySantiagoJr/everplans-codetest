import './Modal.css';

export default function Modal(props) {
  if (!props.show) {
    return null;
  }
  
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {props.children}
      </div>
    </div> 
  )
}