import React from 'react'
import SalesOverTimeChart from './SalesOverTimeChart';
import {BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react/bs'
function Home({loginDetails}) {

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h2>Welcome, {loginDetails.name}!</h2>
            <h3>Store ID: {loginDetails.store_id}</h3>
            <h3>Location: {loginDetails.city}, {loginDetails.state}, {loginDetails.country}</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>PRODUCTS AVAILABLE</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>300</h1>
            </div>
            {/* <div className='card'>
                <div className='card-inner'>
                    <h3>CATEGORIES</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>12</h1>
            </div> */}
            <div className='card'>
                <div className='card-inner'>
                    <h3>EMPLOYEES </h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>33</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>ALERTS</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1>42</h1>
            </div>
        </div>

        <SalesOverTimeChart loginDetails={loginDetails}/>
    </main>
  )
}

export default Home