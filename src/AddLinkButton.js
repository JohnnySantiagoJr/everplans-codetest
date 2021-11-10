import circle from './images/circle.svg';
import plusSign from './images/plus-sign.svg';
import './AddLinkButton.css';

export default function AddLinkButton(props) {
  return (
    <button disabled={props.disabled}onClick={props.onClick} className="addLinkButton">
      <img className="buttonBackground" src={circle} alt="circle" />
      <img className="plusSign" src={plusSign} alt="plus sign" />
    </button>
  )
} 