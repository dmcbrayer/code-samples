import React from 'react'

export const Layout = ({children}) => (
  <div  className="modal fade" 
        id="announcementModal" 
        tabIndex="-1" 
        role="dialog" 
        aria-labelledby="announcementModalLabel">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-body">
          <div className="modal-inner-body anouncement">
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
)
