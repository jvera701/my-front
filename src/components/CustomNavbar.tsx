import { Navbar, NavItem, NavLink } from 'react-bootstrap'
import { NavLink as NavLinkRoute } from 'react-router-dom'
import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../store/actionCreators'
import '../assets/styles/Navbar.css'

function CustomNavbar(props) {
  const { showFiles } = props
  const dispatch = useDispatch()

  function logout(key) {
    if (key === 'logout') {
      dispatch(logOut())
    }
  }

  return (
    <Navbar bg='blues' sticky='top' onSelect={key => logout(key)}>
      <NavItem className='me-auto'>
        <NavLink as={NavLinkRoute} to='/home' className='orange'>
          Home
        </NavLink>
      </NavItem>
      {showFiles ? (
        <NavItem>
          <NavLink as={NavLinkRoute} to='/files' className='orange'>
            Files
          </NavLink>
        </NavItem>
      ) : (
        ''
      )}
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
