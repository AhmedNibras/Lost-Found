import React from 'react'
import {MDBSpinner} from "mdb-react-ui-kit"


const Spinner = () => {
  return (
    <MDBSpinner className='me-2 w-12 h-12 mt-24'>
        <span className='visually-hidden'>Loading...</span>

    </MDBSpinner>
  )
}

export default Spinner
