import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Sidebar.css'
import { BsPeopleFill,
BsListCheck, BsCurrencyDollar, BsCalculator, BsList, BsExclamationCircle, 
}
    from 'react-icons/bs'

function Sidebar({ openSidebarToggle, OpenSidebar }) {
    const navigate = useNavigate()
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            {/* //TODO: Finish the links */}
            <div className='sidebar-list'>
                <button className='sidebar-list-item' onClick={() => navigate('/analytics')}>
                    <BsCalculator className='icon' /> Analytics
                </button>
                <button className='sidebar-list-item' onClick={() => navigate('/purchases')}>
                    <BsCurrencyDollar className='icon' /> Purchases
                </button>
                <button className='sidebar-list-item' onClick={() => navigate('/employees')}>
                    <BsPeopleFill className='icon' /> Employees
                </button>
                <button className='sidebar-list-item' onClick={() => navigate('/inventory')}>
                    <BsListCheck className='icon' /> Inventory
                </button>
                <button className='sidebar-list-item' onClick={() => navigate('/orders')}>
                    <BsList className = 'icon'/> Orders
                </button>
                <button className='sidebar-list-item alerts' onClick={() => navigate('/alerts')}>
                    <BsExclamationCircle className = 'icon'/> Alerts
                </button>

                {/* <button className='sidebar-list-item' onClick={() => navigate('/add-purchase')}>
                    <BsBagPlusFill/> Add A Purchase
                </button> */}
            </div>
        </aside>
    )
}

export default Sidebar