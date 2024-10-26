import React from 'react';

const DynamicInvoiceTable = ({ data }) => {
  // Skip these properties when creating the table
  const excludedFields = ['images', 'id', '_id', '__v', 'category_id'];
  
  // Function to get headers from the first product
  const getHeaders = () => {
    if (!data?.products?.[0]) return [];
    
    // Get all keys from the first product
    const headers = Object.keys(data.products[0])
      .filter(key => !excludedFields.includes(key))
      .map(key => ({
        key,
        // Convert snake_case or camelCase to Title Case
        label: key
          .split(/[_\s]/)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ')
      }));
    
    return headers;
  };

  // Calculate row totals if product_amount and order_quantity exist
  const calculateRowTotal = (item) => {
    if (item.product_amount && item.order_quantity) {
      return item.product_amount * item.order_quantity;
    }
    return null;
  };

  // Calculate grand total
  const calculateGrandTotal = () => {
    if (!data?.products) return 0;
    return data.products.reduce((total, item) => {
      const rowTotal = calculateRowTotal(item);
      return total + (rowTotal || 0);
    }, 0);
  };

  // Format currency values
  const formatCurrency = (value) => {
    if (typeof value === 'number') {
      return `₦${value.toLocaleString()}`;
    }
    return value;
  };

  // Format cell value based on field type
  const formatCellValue = (value, key) => {
    if (key.includes('amount') || key.includes('price') || key.includes('total')) {
      return formatCurrency(value);
    }
    return value;
  };

  const headers = getHeaders();

  return (
    <div className="table-responsive">
      <table className="invoice-table">
        <thead>
          <tr>
            {headers.map(({ key, label }) => (
              <th key={key}>{label}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data?.products?.map((item, index) => (
            <tr key={index}>
              {headers.map(({ key }) => (
                <td key={key}>{formatCellValue(item[key], key)}</td>
              ))}
              <td>{formatCurrency(calculateRowTotal(item))}</td>
            </tr>
          ))}
          <tr className="total-row">
            <td 
              colSpan={headers.length} 
              style={{ textAlign: 'right', fontWeight: 'bold' }}
            >
              Grand Total:
            </td>
            <td style={{ fontWeight: 'bold' }}>
              {formatCurrency(calculateGrandTotal())}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DynamicInvoiceTable;