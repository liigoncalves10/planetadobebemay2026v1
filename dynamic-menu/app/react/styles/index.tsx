import styled, { css } from 'styled-components'

interface IMenuItemStyle {
  customClass?: string
  all?: boolean
  mobilePlace?: string
  hasChildren?: boolean
}

interface ISubmenuContainerStyle {
  second?: boolean
  third?: boolean
}

interface ISubmenuItemStyle {
  all?: boolean
  hasChildren?: boolean
}

export const Navbar = styled.nav<{ open: boolean }>`
  width: 100%;
  max-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-top: 1px solid #f6f6f7;

  @media (max-width: 1024px) {
    display: block;
    background-color: #ffffffff;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: -100%;
    z-index: 999;
    transition: left ease 250ms;
  }

  @media (min-width: 1025px) {
    /* Keep the navbar full-bleed and make it stick above the header when scrolling */
    position: sticky;
    top: 0;
    width: 100%;
    background-color: #fff;
    z-index: 99;
  }

  ${(props) =>
    props.open &&
    css`
      @media (max-width: 1024px) {
        left: 0px;
      }
    `}
`

export const NavbarContainer = styled.nav`
  height: 100%;
  width: 100%;
  overflow-y: scroll;

  @media (min-width: 1025px) {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: initial;
    width: 100%;
    padding: 0 15px; /* keep some horizontal breathing room */
  }
`

export const MenuContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  @media (min-width: 1025px) {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`

export const MenuMobileHeader = styled.div`
  height: 59px;
  position: relative;
  font-size: 19px;
  font-weight: 400;
  text-transform: uppercase;
  color: #2ab1b7;
  letter-spacing: 1px;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const MenuMobileClose = styled.span`
  position: absolute;
  top: 50%;
  left: 20px;
  padding: 0.25rem;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
`

export const SubmenuWrapper = styled.div`
  background-color: #fff;
  width: 100%;
  height: auto;
  display: none;

  @media (min-width: 1025px) {
    height: 371px;
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 279px;
    border-radius: 0px 0px 0px 12px;
    background: #fff;
    box-shadow: 0px 12px 12px rgba(0, 0, 0, 0.06);
  }
`

export const SubmenuContainer = styled.div`
  width: 100%;
  height: auto;
  position: relative;

  @media (min-width: 1025px) {
    height: 100%;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
  }
`

export const Submenu = styled.ul<ISubmenuContainerStyle>`
  width: 100%;
  height: auto;
  padding: 0 23px;
  list-style: none;
  margin: 0;
  overflow-y: auto;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 9px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #d2d2d2;
  }

  @media (min-width: 1025px) {
    width: 279px;
    height: 100%;
    padding: 0;
  }

  ${(props) =>
    props.second &&
    css`
      padding: 0 10px 15px;
      display: none;

      @media (min-width: 1025px) {
        position: absolute;
        top: 0;
        left: 270px;
        border-radius: 0px 0px 12px 0px;
        background: #f6f6f7;
      }
    `}

  ${(props) =>
    props.third &&
    css`
      padding: 5px 10px 10px;
      display: none;

      @media (min-width: 1025px) {
        position: absolute;
        top: 0;
        left: 270px;
        box-shadow: none;
        border-radius: 0px 0px 12px 0px;
        background: #f6f6f7;
      }
    `}
`

export const MenuItem = styled.li<IMenuItemStyle>`
  font-size: 15px;
  font-weight: 400;
  color: #727272;
  border-bottom: 1px solid #e9e9e9;
  display: block;

  @media (min-width: 1025px) {
    padding: 18px 9px 19px;
    font-size: 14px;
    color: #4b4b4b;
    border: 0;
    position: relative;
    display: flex;
    align-items: center;
    ${(props) =>
      props.all &&
      css`
        display: none;
      `}


    & a[href="/"] {
      background-color: #c55fa0;
      border-radius: 30px;
      padding: 5px 17px;
      margin-right: -5px;
      margin-left: -15px;
      position: relative;
      top: -2px;
      color: white;
      display: flex;
      align-items: center;
      font-weight: 500;

      &::after {
        content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'/%3E%3C/svg%3E");
        margin-left: 5px;
        height: 22px;
      }

      &:hover {
        background-color: #c55fa0;
        color: white;
      }
    }

    & a[href="/152?map=productClusterIds" i] {
      background-color: #2ab1b7;
      border-radius: 30px;
      padding: 5px 17px;
      margin-right: -5px;
      position: relative;
      top: -2px;
      color: white;
      font-weight: 500;
      display: flex;
      align-items: center;

      &::after {
        content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='26' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M12 2l2.09 2.26L17 3l.74 2.99L21 7l-1.26 2.99L21 13l-3.26 1.01L17 17l-2.91-.26L12 19l-2.09-2.26L7 17l-.74-2.99L3 13l1.26-2.99L3 7l3.26-1.01L7 3l2.91.26L12 2z'/%3E%3Ctext x='12' y='15' text-anchor='middle' font-size='10' fill='%2300aeb3' font-family='Arial, Helvetica, sans-serif'%3E%25%3C/text%3E%3C/svg%3E");
        margin-left: 5px;
        height: 22px;
      }

      &:hover {
        background-color: #267c75;
        color: white;
      }
    }

    &:last-of-type {
      @media (min-width: 1025px) {
        padding-right: 0;

        > a {
          color: #c55fa0;
          font-weight: 400;
        }
      }
    }

    &:hover {
      @media (min-width: 1025px) {
        > a {
          color: #2ab1b7;
        }
        &:after {
          content: '';
          width: 100%;
          height: 4px;
          background: #2ab1b7;
          position: absolute;
          top: 100%;
          left: 0;
          border-radius: 30px;
        }
      }
    }


    &:has(a[href="/"]) {
        &:hover {
            &::after {
                background: transparent;
            }
        }
    }

    &:has(a[href="/152?map=productClusterIds" i]) {
        &:hover {
            &::after {
                background: transparent;
            }
        }
    }
  }


  ${(props) =>
    props.all &&
    css`
      font-weight: 900;
    `}

  ${(props) =>
    props.mobilePlace === 'header' &&
    css`
      background-color: #f6f6f7;
      display: block;
      width: 100%;
      > a {
        text-transform: uppercase;
      }
    `}

  ${(props) =>
    props.mobilePlace === 'footer' &&
    css`
      background-color: #2ab1b7;
      font-size: 14px;
      color: #2ab1b7;
      display: inline-block;
    `}

  &:hover {
    @media (min-width: 1025px) {
      ${(props) =>
        props.all &&
        css`
          background-color: #c55fa0;
        `}

      > ${SubmenuWrapper} {
        display: block;
      }
    }
  }

  > a {
    position: relative;
    padding: 14px 15px 15px;
    color: #727272;
    text-decoration: none;
    display: block;

    @media (min-width: 1025px) {
      font-family: 'Helvetica Neue', sans-serif;
      position: static;
      padding: 0;
      color: #4b4b4b;
      font-size: 13px;
      font-weight: 400;
      text-align: center;
    }

    ${(props) =>
      props.mobilePlace === 'header' &&
      css`
        font-size: 15px;
      `}

    ${(props) =>
      props.mobilePlace === 'footer' &&
      css`
        font-size: 17px;
        color: #4b4b4b;
      `}

    &.submenu-open {
      color: #2ab1b7;
      > span {
        transform: rotate(-180deg) translateY(50%);
        svg path {
          fill: #2ab1b7;
        }
      }

      + ${SubmenuWrapper} {
        display: block;
      }
    }

    > span {
      position: absolute;
      top: 50%;
      right: 28px;
      transform: translateY(-50%);
      transition: transform ease 250ms;
      display: none;

      ${(props) =>
        props.hasChildren &&
        css`
          display: block;
        `}
    }
  }

  .category-third-level {
    font-weight: normal;
    font-size: 14px;
    text-align: left;
    color: #4b4b4b;
  }
`

export const SubmenuItem = styled.li<ISubmenuItemStyle>`
  font-size: 14px;
  font-weight: 400;
  color: #727272;

  @media (min-width: 1025px) {
    padding: 0 20px;
    font-size: 14px;
    font-weight: 400;
  }

  &:hover {
    @media (min-width: 1025px) {
      font-weight: 400;

      > a {
        color: #2ab1b7;
        border-color: transparent;
        svg {
          path {
            fill: #2ab1b7;
          }
        }
      }

      > ${Submenu} {
        display: block;
      }
    }
  }

  > a {
    position: relative;
    padding: 14px 15px;
    color: #727272;
    text-decoration: none;
    display: block;
    font-weight: 400;

    @media (min-width: 1025px) {
      position: relative;
      padding-right: 0;
      padding-left: 0;

      > span {
        transform: rotate(-90deg) !important;
        top: 14px !important;
      }
    }

    &.submenu-open {
      > span {
        transform: rotate(-180deg) translateY(50%);
      }

      + ${Submenu} {
        display: block;
      }
    }

    > span {
      position: absolute;
      top: 50%;
      right: 28px;
      transform: translateY(-50%);
      transition: transform ease 250ms;
      display: none;

      ${(props) =>
        props.hasChildren &&
        css`
          display: block;
        `}
    }
  }

  ${(props) =>
    props.all &&
    css`
      @media (min-width: 1025px) {
        border-bottom: 1px solid #e9e9e9;
      }
    `}
`

export const SubmenuBanner = styled.div`
  margin-right: 26px;
`

export const SeeMore = styled.a`
  a {
    font-weight: 400;
    font-size: 14px;
    line-height: 30px;
    text-align: left;
    color: #4b4b4b;
    padding: 14px 15px;
    text-decoration: underline;
  }
  @media (min-width: 1025px) {
    display: none;
  }
`

export const HamburguerMobileIcon = styled.div`
  width: 25px;
  height: 19px;
  cursor: pointer;
`

export const OverlayStyle = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
`


