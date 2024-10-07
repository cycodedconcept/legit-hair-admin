import React, {useEffect} from 'react'
import { adminUser, setAdminFormData, getMenus, assignMenu, updateBankDetails, setUpdateDetails } from '../features/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';


const Admin = () => {
  const dispatch = useDispatch();
  const { 
      name, email, phone_number, 
      error, success, spinItem, 
      menus, menu_id, admin_user_id,
      bank_name, account_name, account_number
    } = useSelector((state) => state.admin);

  let token = localStorage.getItem("key");


  const logChange = (e) => {
    const { name, value } = e.target;
    dispatch(setAdminFormData({ field: name, value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !email || !phone_number) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please fill in all the fields.',
        confirmButtonColor: '#FF962E'
      });
      return;
    }
  
    const rawData = { name, email, phone_number };
  
    try {
      const result = await dispatch(adminUser({token, rawData})).unwrap();
  
      if (result.success) {
        Swal.fire({
          icon: 'success',
          title: 'Created Successfully',
          text: 'The user has been created successfully.',
          confirmButtonColor: '#FF962E'
        });
  
        resetForm();
      } else {
        throw new Error(result.message || 'Failed to create user.');
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'An error occurred during the submission. Please try again.',
        confirmButtonColor: '#FF962E'
      });
    }
  };
  
  const resetForm = () => {
    dispatch(setAdminFormData({ field: 'name', value: '' }));
    dispatch(setAdminFormData({ field: 'email', value: '' }));
    dispatch(setAdminFormData({ field: 'phone_number', value: '' }));
  };

  useEffect(() => {
      if (token) {
          dispatch(getMenus(token));
      }
  }, [dispatch, token])
  

  return (
    <>
    <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-6">
            <form style={{width: '100%'}} onSubmit={handleSubmit}>
                <h5 style={{color: '#FF962E'}}>Create Admin User</h5>
                <div className="form-group">
                    <label className='mt-3'>Admin User Name</label>
                    <input type="text" placeholder='legit hair' name='name' value={name} onChange={logChange}/>
                </div>
                <div className="form-group">
                    <label className='mt-3'>Admin User Email</label>
                    <input type="email" placeholder='legit@gmail.com' name='email' value={email} onChange={logChange}/>
                </div>
                <div className="form-group">
                    <label className='mt-3'>Admin User Phone Number</label>
                    <input type="tel" placeholder='08131529845' name='phone_number' value={phone_number} onChange={logChange}/>
                </div>
                <button className='log-btn mt-5'>
                {
                  spinItem ?(
                    <>
                      <div className="spinner-border spinner-border-sm text-light" role="status">
                        <span className="sr-only"></span>
                      </div>
                      <span>Creating... </span>
                    </>
                      
                  ): (
                      'Add Admin User'
                  )
                }
              </button>
            </form>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-6"></div>
    </div>
    
      
    </>
  )
}

export default Admin
