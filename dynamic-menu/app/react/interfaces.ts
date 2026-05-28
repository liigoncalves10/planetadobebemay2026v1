export interface ISubmenuItems {
  name: string
  href: string
  blockClass?: string
}

export interface IMenuItems {
  departamentId?: number
  name: string
  href: string
  submenuItems?: ISubmenuItems[]
}

export interface IDynamicMenu {
  categoryLevel: number
  maxItems: number
  dropdownSize: string
  banner: boolean
  seeMore: {
    enable: boolean
    label: string
  }
  allDepartaments: {
    enable: boolean
    label: string
  }
  mobile: {
    header: {
      title: string
      items: ISubmenuItems[]
    }
    footer: {
      items: ISubmenuItems[]
    }
  }
  items: IMenuItems[]
}
