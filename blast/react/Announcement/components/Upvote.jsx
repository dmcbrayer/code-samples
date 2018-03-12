import React from 'react'

export const Upvote = ({onClick, active}) => (
  <a  href="javascript:void(0)" 
      onClick={onClick} 
      className={active ? "announcement__vote-button--active" : "announcement__vote-button"}>
    <span className="fa fa-2x fa-thumbs-o-up"></span>
  </a>
)