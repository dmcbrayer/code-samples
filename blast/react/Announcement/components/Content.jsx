import React from 'react'
import PropTypes from 'prop-types'

export const Content = ({title, content}) => (
  <div>
    <h1 className="announcement__title">{ title }</h1>
    <div  id="modal-announcement-content" 
          className="announcement__content" 
          dangerouslySetInnerHTML={{ __html: content }} />
  </div>
)

Content.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}
