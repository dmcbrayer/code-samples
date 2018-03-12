import React from 'react'

export const Downvote = ({onClick, active}) => (
  <a  href="javascript:void(0)" 
      onClick={onClick}
      className={active ? "announcement__vote-button--active" : "announcement__vote-button"}>
    <span className="fa fa-2x fa-flip-horizontal fa-thumbs-o-down"></span>
  </a>
)