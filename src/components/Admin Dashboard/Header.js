import React from 'react'
import { BsJustify } from 'react-icons/bs'
import { FaWindowClose } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
function Header({ OpenSidebar }) {
     const navigate = useNavigate()
     return (
          <header className='header'>
               <div className='menu-icon'>
                    <BsJustify className='icon' onClick={OpenSidebar} />
               </div>
               <div className='header-left'>
               </div>
               <div className='header-right'>
                    <button onClick={() => navigate('/')}>
                         <FaWindowClose></FaWindowClose>
                    </button>
               </div>
          </header>
     )
}

export default Header