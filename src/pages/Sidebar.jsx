import React from 'react'
import { Dash, Logo, Order, Product, Report, User, Com } from '../assets/images';
import './pages.css'


const Sidebar = ({ onButtonClick, activeContent }) => {
  const sidebarItems = [
    {
        id: 0,
        name: 'Dashboard',
        image: Dash,
        bname: 'dashboard'
    },
    {
        id: 1,
        name: 'Product Management',
        image: Product,
        bname: 'product'
    },
    {
        id: 2,
        name: 'Company Management',
        image: Com,
        bname: 'company'
    },
    {
        id: 3,
        name: 'Order Management',
        image: Order,
        bname: 'order'
    },
    {
        id: 4,
        name: 'Customer Management',
        image: User,
        bname: 'customer'
    },
    {
        id: 5,
        name: 'Reports',
        image: Report,
        bname: 'report'
    }
  ]

  const showMenu = sidebarItems.map((item) => { 
    return <button key={item.id} className={activeContent === item.bname ? 'sidebar-menu button active': 'sidebar-menu button'} onClick={() => {
        onButtonClick(item.bname)
    }}>
    <img src={item.image} alt="" className='px-3'/>
    {item.name}
    </button>
})
  return (
    <React.Fragment>
        <div className="sidebar">
            <img src={ Logo } alt="" className='w-75 mx-2 mt-2'/>
            <div className="sidebar-menu">
                { showMenu }
            </div>
        </div>
    </React.Fragment>
  )
}

export default Sidebar
