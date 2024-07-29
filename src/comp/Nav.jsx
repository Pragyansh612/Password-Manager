import React from 'react'

const Nav = () => {
  return (
    <div className=' bg-teal-500 h-14 flex justify-between items-center'>
      <div className=' relative left-32 text-2xl font-semibold text-white hover:text-4xl duration-200'>
        PassOP
      </div>
      <div className=' flex relative right-16 gap-10'>
        <a href=""><li className=' list-none hover:font-semibold duration-200'>Home</li></a>
        <a href=""><li className=' list-none hover:font-semibold duration-200'>About</li></a>
        <a href=""><li className=' list-none hover:font-semibold duration-200'>Contact</li></a>
      </div>
    </div>
  )
}

export default Nav
