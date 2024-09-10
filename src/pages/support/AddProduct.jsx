import React from 'react'

const AddProduct = () => {
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

               <div className="col-sm-12 col-md-12 col-lg-6">
                  <div className="form-group">
                     <label htmlFor="exampleInputPassword1">Stock</label>
                     <input type="file" multiple/>
                 </div>
               </div>
               <div className="col-sm-12 col-md-12 col-lg-6">
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
           </div>
            
            
            
            <button className='log-btn mt-5'>Create Product</button>
        </form>
    </>
  )
}

export default AddProduct
