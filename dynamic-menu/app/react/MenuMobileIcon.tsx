import React, { useContext } from 'react'

import { DyamicMenuContext } from './context'
import { HamburguerMobileIcon } from './styles'

function MenuMobileIcon() {
  const { toggleMenuMobile, isMobile } = useContext(DyamicMenuContext)

  const handleMenuOpen = () => {
    toggleMenuMobile()
  }

  return (
    <>
      {isMobile && (
        <HamburguerMobileIcon onClick={handleMenuOpen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24.432"
            height="16.731"
            viewBox="0 0 24.432 16.731"
          >
            <g
              id="Group_3888"
              data-name="Group 3888"
              transform="translate(-41.284 -32.4)"
            >
              <line
                id="Line_3"
                data-name="Line 3"
                x2="24.432"
                transform="translate(41.284 33.5)"
                fill="none"
                stroke="#2ab1b7"
                strokeWidth="2.2"
              />
              <line
                id="Line_4"
                data-name="Line 4"
                x2="24.432"
                transform="translate(41.284 40.766)"
                fill="none"
                stroke="#2ab1b7"
                strokeWidth="2.2"
              />
              <line
                id="Line_5"
                data-name="Line 5"
                x2="24.432"
                transform="translate(41.284 48.031)"
                fill="none"
                stroke="#2ab1b7"
                strokeWidth="2.2"
              />
            </g>
          </svg>
        </HamburguerMobileIcon>
      )}
    </>
  )
}

export default MenuMobileIcon
