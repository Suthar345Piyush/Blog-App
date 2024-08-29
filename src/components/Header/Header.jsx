import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authstatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  // jab bhi ase navigation bar banti hain tab ek array bana ke uspe loop lagate hain 

  const navItems = [
    {name: 'Home',
     slug: '/',
     active: true
    },

    {
       name: "Login",
       slug: "/login",
       active: !authstatus,
    },

    {
      name: "Signup",
      slug: "/signup",
      active: !authstatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authstatus,
    },

    {
      name: "Add Post",
      slug: "/add-post",
      active: authstatus,
    },
  ]
   
   

  return (
    <Header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className= 'mr-4'>
            <link to='/'>
              <Logo width='70px'></Logo>
            </link>
          </div>
          <ul className='flex ml-auto'>
            {
              navItems.map((item) => item.active ? (
                <li key={item.name}>
                  <button onClick={() => navigate(item.slug)}
                  className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>{item.name}</button>
                </li>
               ): null
               
               )}
               {authService}
          
          </ul>
        </nav>
      </Container>
    </Header>
    
  )
}

export default Header
