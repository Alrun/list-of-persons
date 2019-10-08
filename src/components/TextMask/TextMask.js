import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

export default function TextMask(props) {
  const {inputRef, ...other} = props;

  return (
    <MaskedInput
      { ...other }
      ref={ ref => {
        inputRef(ref ? ref.inputElement : null);
      } }
      mask={ ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/] }
      placeholderChar={ '\u2000' }
      showMask
    />
  );
}

TextMask.propTypes = {
  inputRef: PropTypes.func.isRequired,
};