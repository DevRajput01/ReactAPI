import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
      <nav className='flex justify-center' style={{ padding: "20px", margin: "10px" }}>
        <Link to="/page1" style={{ margin: "10px" }}>
        <Button variant="contained" color="success">API Edit Delete Update</Button>
        </Link>
        <Link to="/page2" style={{ margin: "10px" }}>
        <Button variant="contained" color="success">Grid In TailwindCss</Button>
        </Link>
         <Link to="/page3" style={{ margin: "10px" }}>
        <Button variant="contained" color="success">All User's Data</Button>
        </Link>
      </nav>
    </>
  )
}
