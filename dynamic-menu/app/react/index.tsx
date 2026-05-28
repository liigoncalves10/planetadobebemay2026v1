import React from 'react'

import { DyamicMenuContextProvider } from './context'
import { IDynamicMenu } from './interfaces'
import Menu from './DynamicMenu'
import Overlay from './Overlay'

const DynamicMenuDefaultProps = {
  categoryLevel: 3,
  maxItems: 14,
  dropdownSize: 'full' as 'full' | 'auto',
  banner: false,
  seeMore: {
    enable: true,
    label: 'Ver mais',
  },
  allDepartaments: {
    enable: true,
    label: 'Todos os Departamentos',
  },
  mobile: {
    header: {
      title: 'Menu',
      items: [],
    },
    footer: {
      items: [],
    },
  },
  items: [],
}

function DynamicMenu(
  dynamicMenuProps: IDynamicMenu & typeof DynamicMenuDefaultProps
) {
  return (
    <DyamicMenuContextProvider>
      <Overlay />
      <Menu data={dynamicMenuProps} />
    </DyamicMenuContextProvider>
  )
}

DynamicMenu.defaultProps = DynamicMenuDefaultProps

export default DynamicMenu
