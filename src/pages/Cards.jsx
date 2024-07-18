import React, { useState } from 'react'
import { Cart, User, Order } from '../assets/images';
import { BarChart, PieChart, Progress } from './Chart';

const Cards = () => {
  const [progress, setProgress] = useState(15)
  const cardItems = [
    {
      id: 0,
      icon: Cart,
      content: "Saved Product",
      otherContent: "Total Products",
      cvalue: "20%",
      dvalue: "39,280"
    },
    {
      id: 1,
      icon: User,
      content: "Customers",
      otherContent: "Active",
      cvalue: "1,250",
      dvalue: "1,180 -4.90%"
    },
    {
      id: 2,
      icon: Order,
      content: "All Orders",
      otherContent: "Pending",
      anotherContent: "Completed",
      cvalue: "20,656",
      dvalue: "5,790",
      evalue: "14,866 +10.80%"
    },
  ]

  const cardDisplay = cardItems.map((item) => 
    <div className="card-single" key={item.id}>
      <div className="card-head p-2">
        <img src={item.icon} alt="" />
      </div>
      <div className="card-body d-flex justify-content-between">
        <div>
          <p className={ item.content === 'Saved Product' ? 'text-color': '#222'}>{item.content}</p>
          <p style={{ fontWeight: '600'}}>{item.cvalue}</p>
        </div>
        <div>
          <p>{item.otherContent}</p>
          <p style={{ fontWeight: '600'}}>{item.dvalue}</p>
        </div>
        <div>
          <p>{item.anotherContent}</p>
          <p style={{ fontWeight: '600'}}>{item.evalue}</p>
        </div>
      </div>
    </div>
  )
  return (
    <React.Fragment>
      <div className="dash-cards">
        { cardDisplay }
        </div>
      <div className="row mt-5">
        <div className="col-sm-12 col-md-12 col-lg-7">
          <BarChart />
          <div className="row mt-5">
            <div className="col-sm-12 col-md-12 col-lg-6 p-2">
              <h5 className='mb-4'>Customer Volume</h5>
              <Progress percentage={progress} />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6 p-2">
              <h5 className='mb-3'>Customer Behavior</h5>
                <PieChart />
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-5"></div>
      </div>
    </React.Fragment>
  )
}

export default Cards
