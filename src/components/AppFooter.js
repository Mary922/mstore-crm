import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>

          Manyasha

        <span className="ms-1">&copy; 2024 Labs.</span>
      </div>

    </CFooter>
  )
}

export default React.memo(AppFooter)
