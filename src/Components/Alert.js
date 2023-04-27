import React from 'react'

export default function Alert(props) {

  return (
    <div style={{ height: '50px' }} >
      {props.alert && <div>
        <div className={`alert alert-${props.alert.alertType} alert-dismissible fade show`} role="alert">
          <strong>{props.alert.alertType}</strong>: {props.alert.msg}
        </div>
      </div>}
    </div>
  )

}
