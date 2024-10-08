import React, { useState } from 'react'
import { Filter } from '../../assets/images'

const Select = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [sugget, setSuggest] = useState(0);


  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const filItem = [
    "filter", "Product", "Active", "Stock", "Closed", 
    "Draft", "Enable", "Disable"
  ]

  const fil = filItem.map((item, index) =>
    <option key={index} value={index === sugget ? '' : item}>{item}</option> 
  )
  return (
    <>
      <div className="select-wrapper">
        <img src={Filter} alt="" className='select-icon'/>
        <select value={selectedOption} onChange={handleSelectChange} className="select-input">
          {fil}
        </select>
    </div>
    </>
  )
}

export default Select
