import React from 'react'
import { Upvote } from './Upvote'
import { Downvote } from './Downvote'
import { SubmitButton } from './SubmitButton'

const flexStyles = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  marginTop: '2em'
}

export const Actions = ({
  buttonDisabled,
  buttonText,
  score, 
  onButtonClick, 
  onUpVote, 
  onDownVote
}) => {
  let buttonClass = 'button button--primary announcement__button'
  if(!buttonDisabled) { buttonClass = buttonClass + '--active' }

  return (
    <div className="announcement__button-wrapper" style={flexStyles}>
      <Downvote active={score === -1} onClick={onDownVote} />
      <SubmitButton
        disabled={buttonDisabled}
        onClick={onButtonClick}
        text={buttonText} />
      <Upvote active={score === 1} onClick={onUpVote} />
    </div>
  )
}
