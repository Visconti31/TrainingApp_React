import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'

import { Container } from 'semantic-ui-react'

export default function Main() {
  return (
    <Container>
      <SideBar />
      <Outlet />
    </Container>
  )
}
