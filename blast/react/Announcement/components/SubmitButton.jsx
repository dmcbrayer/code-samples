import React from 'react'

export const SubmitButton = ({text, disabled, onClick}) => {
  let buttonClass = 'button button--primary announcement__button'
  if(!disabled) { buttonClass = buttonClass + '--active' }

  return (
    <a href="javascript:void(0)"
       disabled={disabled}
       className={buttonClass}
       onClick={disabled ? null : onClick}
       style={{flexBasis: '30%'}}>
      {text}
    </a>
  )
}
