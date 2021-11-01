import { Navbar, NavItem, NavLink } from 'react-bootstrap'
import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../store/actionCreators'

function CustomNavbar() {
  const dispatch = useDispatch()

  function logout(key) {
    if (key === 'logout') {
      //console.log('logout')
      dispatch(logOut())
    }
  }

  return (
    <Navbar bg='dark' variant='dark' sticky='top' onSelect={key => logout(key)}>
      <NavItem className='me-auto'>
        <NavLink href='/home'>Home</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href='/' eventKey='logout'>
          {' '}
          Logout{' '}
        </NavLink>
      </NavItem>
    </Navbar>
  )
}

export default CustomNavbar
