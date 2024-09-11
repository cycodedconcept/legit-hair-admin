import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Category from './Category';

const AddProduct = () => {
    const [inputGroups, setInputGroups] = useState([
        { input1: '', input2: '', input3: '' },
    ]);

    const handleAddInputGroup = (e) => {
        e.preventDefault();
        setInputGroups([...inputGroups, { input1: '', input2: '', input3: '' }]);
    };

    const handleRemoveInputGroup = (index) => {
        const newInputGroups = [...inputGroups];
        newInputGroups.splice(index, 1); // Remove the group at the given index
        setInputGroups(newInputGroups);
    };
    
    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newInputGroups = [...inputGroups];
        newInputGroups[index][name] = value;
        setInputGroups(newInputGroups);
    };
  return (
    <>
       <form className='w-100'>
           <div className="row">
               <div className="col-sm-12 col-md-12 col-lg-6">
                 <div className="form-group mb-4">
                <label htmlFor="exampleInputEmail1">Product Name</label>
                <input type="text" placeholder='legit hair'/>
                 </div>
               </div>
               <div className="col-sm-12 col-md-12 col-lg-6">
                 <div className="form-group">
                <label htmlFor="exampleInputPassword1">Price</label>
                <input type="number" placeholder='40000'/>
                 </div>
               </div>
               <div className="col-sm-12 col-md-12 col-lg-6">
               <div className="form-group">
                   <label htmlFor="exampleInputPassword1">Product Discount</label>
                     <input type="number" placeholder='40000'/>
                 </div>
                 
               </div>
               <div className="col-sm-12 col-md-12 col-lg-6">
                  <div className="form-group">
                     <label htmlFor="exampleInputPassword1">Stock</label>
                     <input type="number" placeholder='40000'/>
                 </div>
               </div>

               <div className="col-sm-12 col-md-12 col-lg-6 mt-4">
                  <div className="form-group">
                     <label htmlFor="exampleInputPassword1">Product Images</label>
                     <input type="file" multiple/>
                 </div>
               </div>
               <div className="col-sm-12 col-md-12 col-lg-6 mt-4">
                  <div className="form-group">
                     <label htmlFor="exampleInputPassword1">Status</label>
                     <input type="text" placeholder='pending'/>
                 </div>
               </div>
               <div className="col-sm-12 col-md-12 col-lg-6 mt-4">
                  <div className="form-group">
                   <label htmlFor="exampleInputPassword1">Product Description</label>
                   <textarea name="" id="" cols="30" rows="5"></textarea>
                  </div>
               </div>
               <div className="col-sm-12 col-md-12 col-lg-6 mt-4">
                   <div className="form-group">
                        <div className="d-flex justify-content-between mb-3">
                            <label htmlFor="exampleInputPassword1">Inches</label>
                            <button onClick={handleAddInputGroup} style={{
                                outline: 'none', 
                                background: 'none', 
                                color: '#FF962E',
                                fontSize: '25px',
                                padding: '0',
                                border: '0'
                            }}>+</button>
                        </div>
                      {inputGroups.map((group, index) => (
                        <div key={index} style={{ marginBottom: '20px' }} className="d-flex">
                        <input
                            type="text"
                            name="input1"
                            value={group.input1}
                            onChange={(event) => handleInputChange(index, event)}
                            placeholder="Inches"
                            className='mx-2'
                        />
                        <input
                            type="text"
                            name="input2"
                            value={group.input2}
                            onChange={(event) => handleInputChange(index, event)}
                            placeholder="Price"
                            className='mx-2'
                        />
                        <input
                            type="text"
                            name="input3"
                            value={group.input3}
                            onChange={(event) => handleInputChange(index, event)}
                            placeholder="Discount"
                            className='mx-2'
                        />
                            <FontAwesomeIcon icon={faTimes} onClick={() => handleRemoveInputGroup(index)} style={{color: '#FF962E'}}/>
                        </div>
                       ))}
                   </div>
               </div>
               <div className="col-sm-12 col-md-12 col-lg-6 mt-4">
                 <div className="form-group">
                     <label htmlFor="exampleInputPassword1">Categories</label>
                     <Category />
                 </div>
               </div>
           </div>
            
            
            
            <button className='log-btn mt-5'>Create Product</button>
        </form>
    </>
  )
}

export default AddProduct
