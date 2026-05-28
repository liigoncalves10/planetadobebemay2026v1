import React, { createContext, useState, useEffect } from 'react'

interface IContextProvider {
  children?: React.ReactNode
}

interface IDynamicMenuCtx {
  menuMobileOpen: boolean
  toggleMenuMobile(): void
  isMobile: boolean
}

export const DyamicMenuContext = createContext<IDynamicMenuCtx>(
  {} as IDynamicMenuCtx
)

export const DyamicMenuContextProvider = ({ children }: IContextProvider) => {
  const [menuMobileOpen, setMenuMobileOpen] = useState<boolean>(false)
  const [windowWidth, setWindowWith] = useState<number>(0)

  useEffect(() => {
    const getWindowWidth = () => setWindowWith(window.innerWidth)

    getWindowWidth()
  }, [])

  function toggleMenuMobile() {
    setMenuMobileOpen(!menuMobileOpen)
  }

  const isMobile = windowWidth < 1024

  const values = {
    menuMobileOpen,
    toggleMenuMobile,
    isMobile,
  }

  return (
    <DyamicMenuContext.Provider value={values}>
      {children}
    </DyamicMenuContext.Provider>
  )
}
