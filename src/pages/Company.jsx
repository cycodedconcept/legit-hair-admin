import React, {useEffect, useState} from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanyCategory, fetchCategoryStatus, suspendProduct, fetchSearchValue, viewDetails } from '../features/categorySlice'

const Company = () => {
  const [background, setBackground] = useState('all');
  const [enable, setEnable] = useState(true);
  const [disable, setDisable] = useState(true);
  const [hide, setHide] = useState(true);
  const [myValue, setMyValue] = useState('');
  const [over, setOver] = useState(true);
  const [more, setMore] = useState(true);

  const dispatch = useDispatch();
  const { companyCategory, categoryStatus, currentPage, total_pages, isLoading, error, searchValue, viewCategoryDetails } = useSelector((state) => state.categories);
  let token = localStorage.getItem("key");

  const handleButtonClick = (button) => {
    setBackground(button);
  };

  useEffect(() => {
      if (token) {
          dispatch(fetchCompanyCategory({token, page: currentPage}));
      }
  }, [dispatch, currentPage, token])


  const showEnable = (value, token) => {
    if (token) {
        setEnable(false);
        setDisable(true);
        setHide(false);
        setOver(true)
        dispatch(fetchCategoryStatus({token, statusId: value}))
    }
    
  }

  const showDisable = (value, token) => {
    if (token) {
        setEnable(true);
        setDisable(false);
        setHide(false);
        setOver(true);
        dispatch(fetchCategoryStatus({token, statusId: value}))
    }
  }

  const showAll = (token) => {
      if (token) {
          setEnable(true);
          setDisable(true);
          setHide(true);
          setOver(true);
        dispatch(fetchCompanyCategory({token, page: currentPage}));
      }
  }



    const switchStatus = (id, token) => {
        if (token) {
        console.log(id);
    
        dispatch(suspendProduct({ token, id }))
            .then((result) => {
            if (result.type === 'categories/suspendProduct/fulfilled') {
                dispatch(fetchCompanyCategory({ token, page: 1 }));
    
                Swal.fire({
                title: "Success",
                text: "Status changed successfully!",
                icon: "success",
                button: "OK",
                });
            }
            })
            .catch((error) => {
            console.error(error);
    
            Swal.fire({
                title: "Error",
                text: "Something went wrong while updating the product!",
                icon: "error",
                confirmButtonText: "OK"
            });
            });
        }
    };

    useEffect(() => {
        if (token) {
            setOver(false)
            if (myValue === '') {
                setOver(false)
            }
            dispatch(fetchSearchValue({token, searchValue: myValue}))
        }
    }, [dispatch, token, myValue])

    const myDetails = (id) => {
        console.log(id)
        setMore(false)
    }
  
  return (
    <>
    {more ? (
        <>
          <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-9">
                <div className="search-container">
                    <input type="text" placeholder="Search Order..." className="search-input" value={myValue} onChange={(e) => setMyValue(e.target.value)}/>
                    <span className="search-icon">&#128269;</span>
                </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-3 mt-3 mt-lg-5">
              <button className='pro-btn'>+ Create Company</button>
          </div>
      </div>
      <div className='d-flex justify-content-between mt-2 mt-lg-4 mb-lg-4'>
            <div className='sts-btn p-2'>
            <button
                onClick={() => {
                    handleButtonClick('all');
                    showAll(token);
                }}
                style={{
                backgroundColor: background === 'all' ? '#f6e7d7' : '#fff',
                color: background === 'all' ? '#FF962E' : 'black',
                border: '0'
                }}
            >
                All Company
            </button>

            <button
                onClick={() => {
                handleButtonClick('enable');
                showEnable(1, token);
                }}
                style={{
                backgroundColor: background === 'enable' ? '#f6e7d7' : '#FFF',
                color: background === 'enable' ? '#FF962E' : '#6E7079',
                border: '0'
                }}
            >
                Enable
            </button>

            <button
                onClick={() => {
                    handleButtonClick('disable');
                    showDisable(0, token);
                }}
                style={{
                backgroundColor: background === 'disable' ? '#f6e7d7' : '#FFF',
                color: background === 'disable' ? '#FF962E' : '#6E7079',
                border: '0'
                }}
            >
                Disable
            </button>
            </div>
            <div>
                {enable ? (
                  <button className='el2-btn'>Enable</button>
                ) : ''}

                {disable ? (
                  <button className='el2-btn'>Disable</button>
                ) : ''}
            </div>
      </div>

      <div className="row">
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error?.message || 'Something went wrong'}</div>
            ) : (
                <>
                {over ? (
                    <>
                        {hide ? (
                    <>
                        {companyCategory.map((category) => 
                            <div className='col-sm-12 col-md-12 col-lg-4 mb-3' key={category.categories.id}>
                                <div style={{border: '1px solid #FF962E', borderRadius: '15px', padding: '10px'}}>
                                    <div className='d-flex justify-content-between'>
                                        <label className='custom-checkbox'>
                                            <input type="checkbox" name="options" value="option1"/>
                                            <span className="checkmark"></span>
                                        </label>
                                        <button className='el3-btn mt-3' onClick={() => myDetails(category.categories.id)}>view more</button>
                                    </div>
                                    
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
                                        <button onClick={() => switchStatus(category.categories.id, token)} className={category.categories.status === 1 ? 'deactivate' : 'activate'}>{category.categories.status === 1 ? 'Disable' : 'Activate'}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ): (
                    <>
                    {categoryStatus.map((category) => 
                            <div className='col-sm-12 col-md-12 col-lg-4 mb-3' key={category.categories.id}>
                                <div style={{border: '1px solid #FF962E', borderRadius: '15px', padding: '10px'}}>
                                    <div className='d-flex justify-content-between'>
                                        <label className='custom-checkbox'>
                                            <input type="checkbox" name="options" value="option1"/>
                                            <span className="checkmark"></span>
                                        </label>
                                        <button className='el3-btn mt-3' onClick={() => myDetails(category.categories.id)}>view more</button>
                                    </div>
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
                                        <button onClick={() => switchStatus(category.categories.id, token)} className={category.categories.status === 1 ? 'deactivate' : 'activate'}>{category.categories.status === 1 ? 'Disable' : 'Activate'}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
                    </>
                ) : (
                    <>
                    {searchValue.data && searchValue.data.length > 0 ? (
                            searchValue.data.map((search) => (
                                <div className='col-sm-12 col-md-12 col-lg-4 mb-3' key={search.categories.id}>
                                    <div style={{border: '1px solid #FF962E', borderRadius: '15px', padding: '10px'}}>
                                        <div className='d-flex justify-content-between'>
                                            <label className='custom-checkbox'>
                                                <input type="checkbox" name="options" value="option1"/>
                                                <span className="checkmark"></span>
                                            </label>
                                            <button className='el3-btn mt-3' onClick={() => myDetails(search.categories.id)}>view more</button>
                                        </div>
                                        <div className='mt-5'>
                                            <p style={{marginBottom: '0rem', textAlign: 'center'}}>{search.categories.category_name}</p>
                                            <p className={search.categories.status === 1 ? 'enable' : 'disable'} style={{textAlign: 'center'}}>
                                                {search.categories.status === 1 ? 'Enable' : 'Disable'}
                                            </p>
                                        </div>
                                        <hr style={{borderTop: '1px dashed black'}}/>
                                        <div className='d-flex justify-content-between'>
                                            <div>
                                                <p>Products</p>
                                                <p>{search.products}</p>
                                            </div>
                                            <div className='mt-3'>
                                                <button onClick={() => switchStatus(search.categories.id, token)} 
                                                        className={search.categories.status === 1 ? 'deactivate' : 'activate'}>
                                                    {search.categories.status === 1 ? 'Disable' : 'Activate'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className='text-center'>No records found</p>
                        )}

                    </>
                )}
                
                </>
            )
            }
      </div>
        </>
    ) : 'hello'}
      
      

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
