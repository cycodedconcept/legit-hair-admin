import React from 'react';
import { FaArrowDown, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { Wig1 } from '../../assets/images';

const Products = () => {
    const productData = [
        {
            id: 0,
            image: Wig1,
            name: 'Handmade Pouch',
            variant: '3 Variant',
            sku: '302012',
            company: 'Bag & Pouch',
            stock: '10',
            price: '$121.00',
            status: 'closed',
            added: '29 Dec 2020',
            icons: [FaArrowDown, FaEdit, FaTrash]
        },
        {
            id: 1,
            image: Wig1,
            name: 'Handmade Pouch',
            variant: '3 Variant',
            sku: '302012',
            company: 'Bag & Pouch',
            stock: '10',
            price: '$121.00',
            status: 'closed',
            added: '29 Dec 2020',
            icons: [FaArrowDown, FaEdit, FaTrash]
        },
        {
            id: 2,
            image: Wig1,
            name: 'Handmade Pouch',
            variant: '3 Variant',
            sku: '302012',
            company: 'Bag & Pouch',
            stock: '10',
            price: '$121.00',
            status: 'closed',
            added: '29 Dec 2020',
            icons: [FaArrowDown, FaEdit, FaTrash]
        },
        {
            id: 3,
            image: Wig1,
            name: 'Handmade Pouch',
            variant: '3 Variant',
            sku: '302012',
            company: 'Bag & Pouch',
            stock: '10',
            price: '$121.00',
            status: 'closed',
            added: '29 Dec 2020',
            icons: [FaArrowDown, FaEdit, FaTrash]
        },
        {
            id: 4,
            image: Wig1,
            name: 'Handmade Pouch',
            variant: '3 Variant',
            sku: '302012',
            company: 'Bag & Pouch',
            stock: '10',
            price: '$121.00',
            status: 'closed',
            added: '29 Dec 2020',
            icons: [FaArrowDown, FaEdit, FaTrash]
        },
        {
            id: 5,
            image: Wig1,
            name: 'Handmade Pouch',
            variant: '3 Variant',
            sku: '302012',
            company: 'Bag & Pouch',
            stock: '10',
            price: '$121.00',
            status: 'closed',
            added: '29 Dec 2020',
            icons: [FaArrowDown, FaEdit, FaTrash]
        },
        {
            id: 6,
            image: Wig1,
            name: 'Handmade Pouch',
            variant: '3 Variant',
            sku: '302012',
            company: 'Bag & Pouch',
            stock: '10',
            price: '$121.00',
            status: 'closed',
            added: '29 Dec 2020',
            icons: [FaArrowDown, FaEdit, FaTrash]
        },
        {
            id: 7,
            image: Wig1,
            name: 'Handmade Pouch',
            variant: '3 Variant',
            sku: '302012',
            company: 'Bag & Pouch',
            stock: '10',
            price: '$121.00',
            status: 'closed',
            added: '29 Dec 2020',
            icons: [FaArrowDown, FaEdit, FaTrash]
        },
        {
            id: 8,
            image: Wig1,
            name: 'Handmade Pouch',
            variant: '3 Variant',
            sku: '302012',
            company: 'Bag & Pouch',
            stock: '10',
            price: '$121.00',
            status: 'closed',
            added: '29 Dec 2020',
            icons: [FaArrowDown, FaEdit, FaTrash]
        },{
            id: 9,
            image: Wig1,
            name: 'Handmade Pouch',
            variant: '3 Variant',
            sku: '302012',
            company: 'Bag & Pouch',
            stock: '10',
            price: '$121.00',
            status: 'closed',
            added: '29 Dec 2020',
            icons: [FaArrowDown, FaEdit, FaTrash]
        },{
            id: 10,
            image: Wig1,
            name: 'Handmade Pouch',
            variant: '3 Variant',
            sku: '302012',
            company: 'Bag & Pouch',
            stock: '10',
            price: '$121.00',
            status: 'closed',
            added: '29 Dec 2020',
            icons: [FaArrowDown, FaEdit, FaTrash]
        },
    ]

    const sortProduct = productData.map((item) => 
       <tr key={item.id}>
           <td>
               <div className='d-flex'>
                    <input type="checkbox" name="" id="" className='xform mx-2'/>
                    <img src={item.image} alt="" className='w-25 h-50'/>
                    <div>
                        <p className='m-0 p-0' style={{fontSize: '14px'}}>{item.name}</p>
                        <small>{item.variant}</small>
                    </div>
               </div>
           </td>
           <td>{item.sku}</td>
           <td>{item.company}</td>
           <td>{item.stock}</td>
           <td>{item.price}</td>
           <td>{item.status}</td>
           <td>{item.added}</td>
           <td>{item.icons}</td>
       </tr>
    )
  return (
    <>
      <table className="table">
        <thead>
            <tr>
            <th>
                Product <FaArrowDown className="header-icon" />
            </th>
            <th>
                SKU <FaArrowDown className="header-icon" />
            </th>
            <th>
                Company <FaArrowDown className="header-icon" />
            </th>
            <th>
                Stock <FaArrowDown className="header-icon" />
            </th>
            <th>
                Price <FaArrowDown className="header-icon" />
            </th>
            <th>
                Staus <FaArrowDown className="header-icon" />
            </th>
            <th>
                Added <FaArrowDown className="header-icon" />
            </th>
            <th>
                Acton
            </th>
            </tr>
        </thead>
        <tbody>
            {sortProduct}
        </tbody>
    </table>

    </>
  )
}

export default Products
