import { Navbar, NavItem, NavLink } from 'react-bootstrap'
import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../store/actionCreators'
import '../assets/styles/Navbar.css'

function CustomNavbar() {
  const dispatch = useDispatch()

  function logout(key) {
    if (key === 'logout') {
      dispatch(logOut())
    }
  }

  return (
    <Navbar bg='blue' sticky='top' onSelect={key => logout(key)}>
      <NavItem className='me-auto'>
        <NavLink href='/home' className='orange'>
          Home
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href='/' eventKey='logout' className='orange'>
          {' '}
          Logout{' '}
        </NavLink>
      </NavItem>
    </Navbar>
  )
}

export default CustomNavbar
