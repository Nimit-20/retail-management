import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Sidebar.css'
import {
BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
BsListCheck, BsMenuButtonWideFill
}
    from 'react-icons/bs'

function Sidebar({ openSidebarToggle, OpenSidebar }) {
    const navigate = useNavigate()
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            {/* //TODO: Finish the links */}
            <div className='sidebar-list'>
                <button className='sidebar-list-item' onClick={() => navigate('/analytics')}>
                    <BsGrid1X2Fill className='icon' /> Analytics
                </button>
                <button className='sidebar-list-item' onClick={() => navigate('/purchases')}>
                    <BsFillArchiveFill className='icon' /> Purchases
                </button>
                <button className='sidebar-list-item' onClick={() => navigate('/employees')}>
                    <BsFillGrid3X3GapFill className='icon' /> Employees
                </button>
                <button className='sidebar-list-item' onClick={() => navigate('/customers')}>
                    <BsPeopleFill className='icon' /> Customers
                </button>
                <button className='sidebar-list-item' onClick={() => navigate('/inventory')}>
                    <BsListCheck className='icon' /> Inventory
                </button>
            </div>
        </aside>
    )
}

export default Sidebar