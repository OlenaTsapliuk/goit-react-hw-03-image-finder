import PropTypes from "prop-types";
import s from "./Button.module.css";
function Button({ buttonClick }) {
  return (
    <button type="button" onClick={buttonClick} className={s.button}>
      Load more
    </button>
  );
}

export default Button;
