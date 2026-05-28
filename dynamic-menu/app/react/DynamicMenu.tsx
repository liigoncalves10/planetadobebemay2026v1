import React, { useState, useEffect, useContext } from 'react'
import arraySort from 'array-sort'
import { useCssHandles } from 'vtex.css-handles'

import { DyamicMenuContext } from './context'
import { IDynamicMenu, IMenuItems, ISubmenuItems } from './interfaces'
import {
  Navbar,
  NavbarContainer,
  MenuContainer,
  MenuMobileHeader,
  MenuMobileClose,
  SubmenuWrapper,
  SubmenuContainer,
  Submenu,
  MenuItem,
  SubmenuItem,
  SeeMore,
} from './styles'
import MenuMobileIcon from './MenuMobileIcon'

interface IMenu {
  data: IDynamicMenu
}

const BRANDS = [
  {
    id: 'Marcas',
    name: 'Marcas',
    children: [
      { name: 'Avent', url: '/Avent' },
      { name: 'Divertoys', url: '/Divertoys' },
      { name: 'Fisher-Price', url: '/Fisher-Price' },
      { name: 'Lillo', url: '/Lillo' },
      { name: 'Mam', url: '/mam' },
      { name: 'Maxi Baby', url: '/Maxi-Baby' },
      { name: 'Graco', url: '/graco' },
      { name: 'Medela', url: '/Medela' },
      { name: 'Motorola', url: '/Motorola' },
      { name: 'Multikids', url: '/Multikids' },
      { name: 'Nathor', url: '/Nathor' },
      { name: 'Nuk', url: '/Nuk' },
      { name: 'Protek', url: '/Protek' },
      { name: 'Replay Kids', url: '/Replay-Kids' },
      { name: 'Safety 1st', url: '/Safety-1st' },
      { name: 'Tutty Baby', url: '/Tutty Baby' },
      { name: 'Voyage', url: '/Voyage' },
    ],
    hasChildren: true,
    brands: true,
  },
]

const CSS_HANDLES = [
  'navbar',
  'navbarOpened',
  'navbarContainer',
  'menuContainer',
  'menuItem',
  'menuLink',
  'menuMobileHeader',
  'menuMobileClose',
  'submenuWrapper',
  'submenuContainer',
  'submenu',
  'submenuItem',
  'seeMore',
  'avatarContainer',
  'avatarIcon',
  'welcomeText',
  'accountLink',
] as const

/**
 * Menu Component
 * Optimizations:
 * 1. Wrapped in React.memo to prevent unnecessary re-renders.
 * 2. Moved static BRANDS array outside of the component.
 * 3. Fixed loading state to only resolve after categories are fetched.
 * 4. Improved fetch logic with proper async/await and finally block.
 */
const Menu = React.memo((dynamicMenuProps: IMenu) => {
  const handles = useCssHandles(CSS_HANDLES)
  const { menuMobileOpen, toggleMenuMobile, isMobile } =
    useContext(DyamicMenuContext)
  const [categories, setCategories] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const { categoryLevel } = dynamicMenuProps.data
    const level = categoryLevel > 3 ? 3 : categoryLevel

    const fetchCategories = async () => {
      try {
        const response = await fetch(`/api/catalog_system/pub/category/tree/${level}/`)
        const data = await response.json()
        const sortedCategories = arraySort(data, 'name')
        setCategories(sortedCategories)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [dynamicMenuProps.data.categoryLevel])

  const openSubmenuMobile = (
    e: React.MouseEvent<HTMLElement>,
    hasChildren?: boolean
  ): void => {
    if (isMobile && hasChildren) {
      e.preventDefault()
      e.currentTarget.classList.toggle('submenu-open')
    }
  }

  const arrowMobile = (): React.ReactNode | void => {
    return (
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12.801"
          height="7.52"
          viewBox="0 0 12.801 7.52"
        >
          <g id="back" transform="translate(-4 7.52) rotate(-90)">
            <g
              id="Group_4593"
              data-name="Group 4593"
              transform="translate(0 0)"
            >
              <path
                id="Path_69"
                data-name="Path 69"
                d="M2.527,6.4,7.316,1.614a.7.7,0,0,0,0-.99L6.9.2a.7.7,0,0,0-.99,0L.2,5.906A.707.707,0,0,0,.2,6.9l5.7,5.7a.7.7,0,0,0,.99,0l.42-.419a.7.7,0,0,0,0-.99Z"
                transform="translate(0 4)"
                fill="#4b4b4b"
              />
            </g>
          </g>
        </svg>
      </span>
    )
  }

  const renderThirdLevel = (category: any): React.ReactNode => {
    return (
      <Submenu third className={handles.submenu}>
        {category.children.map((third: any, index: number) => {
          if (isMobile && index >= 3) {
            return false
          }
          return (
            <SubmenuItem key={third.id} className={handles.submenuItem}>
              <a href={third.url} rel="noreferrer" className={handles.menuLink}>
                {third.name}
              </a>
            </SubmenuItem>
          )
        })}
        {renderSeeMore(category.url)}
      </Submenu>
    )
  }

  const renderSecondLevel = (category: any): React.ReactNode => {
    return (
      <Submenu second className={handles.submenu}>
        {category.children.map(
          (second: any, index: number): React.ReactNode => {
            if (isMobile && index >= 3) {
              return false
            }
            return (
              <SubmenuItem
                key={second.id}
                hasChildren={second.hasChildren}
                className={handles.submenuItem}
              >
                <a
                  href={second.url}
                  onClick={(e) => openSubmenuMobile(e, second.hasChildren)}
                  rel="noreferrer"
                  className={`${handles.menuLink} category-third-level`}
                >
                  {second.name}

                  {arrowMobile()}
                </a>

                {second.hasChildren && renderThirdLevel(second)}
              </SubmenuItem>
            )
          }
        )}
        {renderSeeMore(category.url)}
      </Submenu>
    )
  }

  const renderSubmenu = (departament: any): React.ReactNode => {
    // const maxItems =
    //   dynamicMenuProps.data.maxItems !== 0
    //     ? departament.children.lenght
    //     : dynamicMenuProps.data.maxItems

    return (
      <SubmenuWrapper className={handles.submenuWrapper}>
        <SubmenuContainer className={handles.submenuContainer}>
          <Submenu className={handles.submenu}>
            {departament.hasChildren &&
              departament.children.map((child: any, index: number) => {
                if (isMobile && index >= 3 && !departament.brands) {
                  return false
                }
                return (
                  <SubmenuItem
                    key={child.id}
                    hasChildren={child.hasChildren}
                    className={handles.submenuItem}
                  >
                    <a
                      href={child.url}
                      onClick={(e) =>
                        openSubmenuMobile(e, child.hasChildren)
                      }
                      rel="noreferrer"
                      className={handles.menuLink}
                    >
                      {child.name}

                      {arrowMobile()}
                    </a>

                    {child.hasChildren && renderSecondLevel(child)}
                  </SubmenuItem>
                )
              })}

            {!departament.brands && renderSeeMore(departament.url)}
          </Submenu>
        </SubmenuContainer>
      </SubmenuWrapper>
    )
  }

  const renderAllDepartamentsMobile = (): React.ReactNode | boolean => {
    const categoriesAndBrands = [...categories, ...BRANDS]

    if (categoriesAndBrands.length > 0) {
      const menu = categoriesAndBrands.map((departament: any) => {
        if (departament.id == '84') {
          return null
        }

        const hasChildren = !!(departament && departament.hasChildren)
        return (
          <MenuItem
            key={departament.id}
            hasChildren={hasChildren}
            className={handles.menuItem}
          >
            <a
              href={departament.href}
              onClick={(e) => openSubmenuMobile(e, hasChildren)}
              rel="noreferrer"
              className={handles.menuLink}
            >
              {departament.name}

              {arrowMobile()}
            </a>

            {hasChildren && renderSubmenu(departament)}
          </MenuItem>
        )
      })

      return menu
    }

    return false
  }

  const renderAllDepartaments = (): React.ReactNode | void => {
    const { enable, label } = dynamicMenuProps.data.allDepartaments

    if (enable && categories.length > 0) {
      return (
        <MenuItem all className={handles.menuItem}>
          {label}
          <SubmenuWrapper className={handles.submenuWrapper}>
            <SubmenuContainer className={handles.submenuContainer}>
              <Submenu className={handles.submenu}>
                {categories.map((category: any) => (
                  <SubmenuItem
                    key={category.id}
                    all
                    className={handles.submenuItem}
                  >
                    <a
                      href={category.url}
                      rel="noreferrer"
                      className={handles.menuLink}
                    >
                      {category.name}
                    </a>

                    {category.hasChildren && renderSecondLevel(category)}
                  </SubmenuItem>
                ))}
              </Submenu>
            </SubmenuContainer>
          </SubmenuWrapper>
        </MenuItem>
      )
    }
  }

  const renderSeeMore = (url: string): React.ReactNode | boolean => {
    const { enable, label } = dynamicMenuProps.data.seeMore

    if (!enable && !isMobile) {
      return false
    }

    if (!url) {
      return false
    }

    return (
      <SeeMore className={`${handles.seeMore} seeMore`}>
        <a href={url} rel="noreferrer" className={handles.menuLink}>
          {label}
        </a>
      </SeeMore>
    )
  }

  const renderMobileExtraMenu = (place: string): React.ReactNode | boolean => {
    if (
      place === 'header' &&
      dynamicMenuProps.data.mobile.header === undefined
    ) {
      return false
    }

    if (
      place === 'footer' &&
      dynamicMenuProps.data.mobile.footer === undefined
    ) {
      return false
    }

    const { items } =
      place === 'header'
        ? dynamicMenuProps.data.mobile.header
        : dynamicMenuProps.data.mobile.footer

    const hasItems = items.length > 0

    if (hasItems) {
      let sortedItems = [...items]
      if (isMobile && place === 'header') {
        const accountIndex = sortedItems.findIndex(
          (item) => item.blockClass === 'menu-account'
        )
        if (accountIndex > -1) {
          // Remove it from items because we render it in the header
          sortedItems.splice(accountIndex, 1)
        }
      }

      return sortedItems.map((item: ISubmenuItems, i: number) => {
        const itemBlockClass = item.blockClass
          ? ` ${handles.menuItem}--${item.blockClass}`
          : ''
        return (
          <MenuItem
            key={i}
            mobilePlace={place}
            className={`${handles.menuItem}${itemBlockClass}`}
          >
            <a
              href={item.href}
              rel="noreferrer"
              className={`${handles.menuLink}${
                item.blockClass ? ` ${handles.menuLink}--${item.blockClass}` : ''
              }`}
            >
              {item.name}
            </a>
          </MenuItem>
        )
      })
    }

    return false
  }

  const handleCloseMenuMobile = (): void => {
    toggleMenuMobile()
  }

  return (
    <>
      {loading ? (
        <div
          style={{
            height: '40px',
            width: '100%',
            background: '#fff',
            zIndex: 999,
          }}
        >
          <img
            style={{ width: '20px', height: '20px' }}
            src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
            alt="spinner"
          />
        </div>
      ) : (
        <>
          <MenuMobileIcon />
          <Navbar
            open={menuMobileOpen}
            className={`${handles.navbar} ${
              menuMobileOpen ? handles.navbarOpened : ''
            }`}
          >
            <NavbarContainer className={handles.navbarContainer}>
              {isMobile && (
                <>
                  <MenuMobileHeader className={handles.menuMobileHeader}>
                    <MenuMobileClose
                      onClick={handleCloseMenuMobile}
                      className={handles.menuMobileClose}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19.799"
                        height="19.799"
                        viewBox="0 0 19.799 19.799"
                      >
                        <g
                          id="menu_icon"
                          data-name="menu icon"
                          transform="translate(0 0)"
                        >
                          <g
                            id="Rectangle_630"
                            data-name="Rectangle 630"
                            transform="translate(0 18.385) rotate(-45)"
                            fill="none"
                            stroke="#c55fa0"
                            strokeWidth="1"
                          >
                            <rect width="26" height="2" rx="1" stroke="none" />
                            <rect
                              x="0.5"
                              y="0.5"
                              width="25"
                              height="1"
                              rx="0.5"
                              fill="none"
                            />
                          </g>
                          <g
                            id="Rectangle_635"
                            data-name="Rectangle 635"
                            transform="translate(1.414 0) rotate(45)"
                            fill="none"
                            stroke="#c55fa0"
                            strokeWidth="1"
                          >
                            <rect width="26" height="2" rx="1" stroke="none" />
                            <rect
                              x="0.5"
                              y="0.5"
                              width="25"
                              height="1"
                              rx="0.5"
                              fill="none"
                            />
                          </g>
                        </g>
                      </svg>
                    </MenuMobileClose>
                  </MenuMobileHeader>
                  <div className={handles.avatarContainer}>
                    <div className={handles.avatarIcon}>
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 16C18.2091 16 20 14.2091 20 12C20 9.79086 18.2091 8 16 8C13.7909 8 12 9.79086 12 12C12 14.2091 13.7909 16 16 16Z" stroke="#c55fa0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M24 24C24 20.6863 21.3137 18 18 18H14C10.6863 18 8 20.6863 8 24" stroke="#c55fa0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="16" cy="16" r="15" stroke="#c55fa0" strokeWidth="2"/>
                      </svg>
                    </div>
                    <a href="/account" className={handles.accountLink}>
                      Minha conta
                    </a>
                  </div>
                </>
              )}

              <MenuContainer className={handles.menuContainer}>
                {isMobile && renderMobileExtraMenu('header')}

                {isMobile
                  ? renderAllDepartamentsMobile()
                  : renderAllDepartaments()}

                {!isMobile &&
                  dynamicMenuProps.data.items.map(
                    (item: IMenuItems, i: number) => {
                      // const reverse = item.reverse ? true : false

                      if (item.submenuItems) {
                        return (
                          <MenuItem
                            key={i}
                            hasChildren
                            className={handles.menuItem}
                          >
                            <a
                              href={item.href}
                              rel="noreferrer"
                              className={handles.menuLink}
                            >
                              {item.name}
                            </a>

                            <SubmenuWrapper className={handles.submenuWrapper}>
                              <SubmenuContainer
                                className={handles.submenuContainer}
                              >
                                <Submenu className={handles.submenu}>
                                  {item.submenuItems.map(
                                    (el: ISubmenuItems, index: number) => {
                                      return (
                                        <SubmenuItem
                                          key={index}
                                          className={handles.submenuItem}
                                        >
                                          <a
                                            href={el.href}
                                            rel="noreferrer"
                                            className={handles.menuLink}
                                          >
                                            {el.name}
                                          </a>
                                        </SubmenuItem>
                                      )
                                    }
                                  )}
                                </Submenu>
                              </SubmenuContainer>
                            </SubmenuWrapper>
                          </MenuItem>
                        )
                      }

                      const departament = categories.find(
                        (el: any) => el.id === item.departamentId
                      ) as any

                      const hasChildren = !!(
                        departament && departament.hasChildren
                      )

                      return (
                        <MenuItem
                          key={i}
                          hasChildren={hasChildren}
                          className={handles.menuItem}
                        >
                          <a
                            href={item.href}
                            rel="noreferrer"
                            className={handles.menuLink}
                          >
                            {item.name}
                          </a>

                          {hasChildren && renderSubmenu(departament)}
                        </MenuItem>
                      )
                    }
                  )}

                {isMobile && renderMobileExtraMenu('footer')}
              </MenuContainer>
            </NavbarContainer>
          </Navbar>
        </>
      )}
    </>
  )
}
)
export default Menu
