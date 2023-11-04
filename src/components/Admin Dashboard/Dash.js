import { useState } from 'react'
import './dash.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'
import { useNavigate } from 'react-router-dom'
function Dashboard({ loginDetails, isLoggedIn }) {
     const navigate = useNavigate();
     const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
     const OpenSidebar = () => {
          setOpenSidebarToggle(!openSidebarToggle)
     }

     const redirectToLogin = () => {
          alert("Redirecting to login page. Click Ok");
          console.log('redirecting to login');
          setTimeout(() => {
               navigate('/')
          }, 500);
     }

     return (
          <div>
               {isLoggedIn ? (<>
                    {
                         <div className='grid-container'>
                              <Header OpenSidebar={OpenSidebar} />
                              <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
                              <Home loginDetails={loginDetails} />
                         </div>
                    }
               </>) : (<>
                    <h1>You are not logged in, login here:</h1>
                    <button className="btn" onClick={redirectToLogin}>Login here</button>
               </>)}
          </div>
     )
}

export default Dashboard