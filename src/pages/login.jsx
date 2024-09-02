import React from 'react'
import {Login as loginComponent} from '../components'

function login() {
  return (
    <div className='py-8'>
      <loginComponent /> // this are called as self closing tags
    </div>
  )
}

export default login
