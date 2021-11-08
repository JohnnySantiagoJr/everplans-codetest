import circle from './circle.svg';
import plusSign from './plus-sign.svg';
import './AddLinkButton.css';

export default function AddLinkButton() {
  return (
    <div className="addLinkButton">
      <img className="buttonBackground" src={circle} alt="circle" />
      <img className="plusSign" src={plusSign} alt="plus sign" />
    </div>
  )
} 