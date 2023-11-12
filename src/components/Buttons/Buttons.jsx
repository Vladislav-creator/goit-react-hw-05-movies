import css from "./Buttons.module.css"
import cast from '../../components/Images/cast.png';
import review from '../../components/Images/review.png';
import left_arrow from '../../components/Images/left_arrow.png';
import right_arrow from '../../components/Images/right_arrow.png';

const icons = {
    cast,
    review,
    left_arrow,
    right_arrow,
  };

  export const Button = ({ label, icon, reverse, onClick, disabled }) => {
    return (
      <button className={css.wrapper} onClick={onClick} disabled={disabled}>
        {reverse && label}
        <img className={css.icon} src={icons[icon]} alt={label} reverse={reverse} />
        {!reverse && label}
      </button>
    );
  };