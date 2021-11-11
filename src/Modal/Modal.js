import { useEffect } from 'react';

import './Modal.css';

function Modal(props) {
  if (!props.show) {
    document.body.style.overflow = 'unset';
    
    return null;
  } else {
    document.body.style.overflow = 'hidden';
  }
  
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {props.children}
      </div>
    </div> 
  )
};

export default Modal;