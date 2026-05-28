import React, { useContext } from 'react'

import { DyamicMenuContext } from './context'
import { OverlayStyle } from './styles'

function Overlay() {
  const { menuMobileOpen, toggleMenuMobile, isMobile } = useContext(
    DyamicMenuContext
  )

  const handleMenuOpen = () => {
    toggleMenuMobile()
  }

  const showOverlay = !!(isMobile && menuMobileOpen)

  return <>{showOverlay && <OverlayStyle onClick={handleMenuOpen} />}</>
}

export default Overlay
