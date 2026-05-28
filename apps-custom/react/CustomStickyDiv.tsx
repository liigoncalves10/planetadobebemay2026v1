import React, { useEffect } from 'react'
import './css/global.css'

/**
 * CustomStickyDiv Component
 * Optimization: Replaced heavy 'scroll' event listener and getBoundingClientRect()
 * with IntersectionObserver. This eliminates scroll jank and prevents
 * constant main-thread blocking and reflows.
 */
const CustomStickyDiv: React.FC = () => {
  useEffect(() => {
    const targetSelector = '.vtex-flex-layout-0-x-flexRowContent--add-to-cart'
    const stickDesktopSelector = '.vtex-sticky-layout-0-x-container--fixed-buy-infos-desktop'
    const stickMobileSelector = '.vtex-sticky-layout-0-x-container--fixed-buy-infos-mobile'

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0]
      if (!entry) return

      // isIntersecting with threshold 1.0 means the element is fully visible
      const isFullyVisible = entry.isIntersecting && entry.intersectionRatio >= 0.99

      const stickDesktop = document.querySelector(stickDesktopSelector)
      const stickMobile = document.querySelector(stickMobileSelector)

      if (stickDesktop) {
        if (isFullyVisible) {
          stickDesktop.classList.remove('show-sticky')
        } else {
          stickDesktop.classList.add('show-sticky')
        }
      }

      if (stickMobile) {
        if (isFullyVisible) {
          stickMobile.classList.remove('show-sticky')
        } else {
          stickMobile.classList.add('show-sticky')
        }
      }
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0, 1.0], // Observe both entering and being fully visible
    })

    const target = document.querySelector(targetSelector)
    if (target) {
      observer.observe(target)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return <></>
}

export default CustomStickyDiv
