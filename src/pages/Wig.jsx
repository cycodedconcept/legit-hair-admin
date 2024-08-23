import React from 'react'
import './pages.css'
import { Wig1, Wig2, Wig3, Wig4, Wig5 } from '../assets/images'

const Wig = () => {
    const myWigs = [
        {
            id: 0,
            image: Wig1,
            name: "Short Curly Bob Human Hair",
            date: "12 Sept 2022",
            price: "₦730,000.00",
            quantity: "1",
            status: "Pending"
        },
        {
            id: 1,
            image: Wig2,
            name: "Wave Lace Front Wig",
            date: "12 Sept 2022",
            price: "₦730,000.00",
            quantity: "1",
            status: "Completed"
        },
        {
            id: 2,
            image: Wig3,
            name: "Curly Lace Brazilian Hair Wigs",
            date: "12 Sept 2022",
            price: "₦730,000.00",
            quantity: "1",
            status: "Pending"
        },
        {
            id: 3,
            image: Wig4,
            name: "Full Lace Wig",
            date: "12 Sept 2022",
            price: "₦730,000.00",
            quantity: "1",
            status: "Completed"
        },
        {
            id: 4,
            image: Wig5,
            name: "Peruvian Blonde Wig",
            date: "12 Sept 2022",
            price: "₦730,000.00",
            quantity: "1",
            status: "Completed"
        },
        {
            id: 5,
            image: Wig1,
            name: "Short Curly Bob Human Hair",
            date: "12 Sept 2022",
            price: "₦730,000.00",
            quantity: "1",
            status: "Pending"
        },
        {
            id: 6,
            image: Wig2,
            name: "Wave Lace Front Wig",
            date: "12 Sept 2022",
            price: "₦730,000.00",
            quantity: "1",
            status: "Completed"
        },
    ]

    const listWig = myWigs.map((item) => 
       <div className="wig-section d-flex justify-content-between mb-4" key={item.id}>
           <div className="left-section d-flex justify-content-between">
               <div className="left-img">
                   <img src={item.image} alt=""/>
               </div>
               <div className="left-content mx-3">
                   <p>{item.name}</p>
                   <div className="left-price d-flex justify-content-between">
                       <p>{item.price}</p>
                       <p>QTY:{item.quantity}</p>
                   </div>
               </div>
           </div>
           <div className="right-section">
               <p>{item.date}</p>
               <p className={item.status}>{item.status}</p>
           </div>
       </div>
    )
  return (
    <>
        <div className="wig-top d-flex justify-content-between mb-4">
            <h5>Recent Orders</h5>
            <select name="" id="" className='form-input'>
                <option>All</option>
                <option>Pending</option>
                <option>Completed</option>
            </select>
        </div>
      {listWig}
    </>
  )
}

export default Wig
