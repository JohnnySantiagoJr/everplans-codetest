import ellipse from './images/ellipse.png';
import plusSign from './images/plus-sign.svg';
import './AddLinkButton.css';

export default function AddLinkButton(props) {
  return (
    <button className="button" disabled={props.disabled} onClick={props.onClick}>
      <img className="button-background" src={ellipse} alt="circle" />
      <img className="plus-sign" src={plusSign} alt="plus sign" />
    </button>
  )
} 