import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanyCategory, fetchCategoryStatus } from '../features/categorySlice'

const Company = () => {
  const dispatch = useDispatch();
  const { companyCategory, categoryStatus, currentPage, total_pages, isLoading, error, } = useSelector((state) => state.categories);
  let token = localStorage.getItem("key");

  useEffect(() => {
      if (token) {
          dispatch(fetchCompanyCategory({token, page: currentPage}))
      }
  }, [dispatch, currentPage, token])


  return (
    <>
      <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-9">
                <div className="search-container">
                    <input type="text" placeholder="Search Order..." className="search-input" />
                    <span className="search-icon">&#128269;</span>
                </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-3 mt-3 mt-lg-5">
              <button className='pro-btn'>+ Create Company</button>
          </div>
      </div>
      <div className='d-flex justify-content-between mt-2 mt-lg-4 mb-lg-4'>
            <div className='sts-btn p-2'>
                <button className='al-btn'>All Company</button>
                <button className='el-btn'>Enable</button>
                <button className='el-btn'>Disable</button>
            </div>
            <div>
                <button className='el2-btn'>Enable</button>
                <button className='el2-btn'>Disable</button>
            </div>
      </div>

      <div className="row">
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error?.message || 'Something went wrong'}</div>
          ) : (
              <>
               {companyCategory.map((category) => 
                 <div className='col-sm-12 col-md-12 col-lg-4 mb-3' key={category.id}>
                     <div style={{border: '1px solid #FF962E', borderRadius: '15px', padding: '10px'}}>
                         <label className='custom-checkbox'>
                            <input type="checkbox" name="options" value="option1"/>
                            <span className="checkmark"></span>
                        </label>
                        <div className='mt-5'>
                            <p style={{marginBottom: '0rem', textAlign: 'center'}}>{category.categories.category_name}</p>
                            <p className={category.categories.status === 1 ? 'enable' : 'disable'} style={{textAlign: 'center'}}>{category.categories.status === 1 ? 'Enable' : 'Disable'}</p>
                        </div>
                        <hr style={{borderTop: '1px dashed black'}}/>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <p>Products</p>
                                <p>{category.products}</p>
                            </div>
                            <div className='mt-3'>
                              <button className={category.categories.status === 1 ? 'deactivate' : 'activate'}>{category.categories.status === 1 ? 'Disable' : 'Activate'}</button>
                            </div>
                        </div>
                     </div>
                 </div>
               )}
              </>
          )
        }
      </div>
      {total_pages > 1 && (
            <div className="pagination">
            {Array.from({ length: total_pages }, (_, i) => (
                <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                disabled={currentPage === i + 1}
                className="mx-1"
                style={{
                    backgroundColor: '#FF962E',
                    borderRadius: '10px',
                    border: '0',
                }}
                >
                {i + 1}
                </button>
            ))}
            </div>
      )}
    </>
  )
}

export default Company
