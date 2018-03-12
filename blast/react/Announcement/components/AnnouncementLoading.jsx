import React from 'react'
import Loading from '../../components/common/Loading'

export const AnnouncementLoading = () => (
  <div className="modal-inner-body announcement">
    <h2 className="announcement__title"><Loading isLoading={true}/></h2>
    <div id="modal-announcement-content" className="announcement__content">
      <p>Please wait while we load your announcements.</p>
    </div>
  </div>
)
