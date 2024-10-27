import React from 'react';

const DynamicInvoiceTable = ({ data }) => {
  // Define custom headers
  const customHeaders = [
    { key: 'product_name', label: 'Product name' },
    { key: 'inches', label: 'Inches' },
    { key: 'order_quantity', label: 'Quantity' },
    { key: 'product_amount', label: 'Price' },
    { key: 'discounted_price', label: 'Discounted price' },
    { key: 'total', label: 'Total' }
  ];

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
    if (key.includes('amount') || key.includes('price') || key === 'total') {
      return formatCurrency(value);
    }
    return value;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {customHeaders.map(({ key, label }) => (
              <th key={key} className="p-2 border text-left font-medium">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.products?.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              {customHeaders.map(({ key }) => (
                <td key={key} className="p-2 border">
                  {key === 'total' 
                    ? formatCurrency(calculateRowTotal(item))
                    : formatCellValue(item[key], key)}
                </td>
              ))}
            </tr>
          ))}
          <tr className="bg-gray-100">
            <td colSpan={customHeaders.length - 1} className="p-2 border text-right font-medium">
              Grand Total:
            </td>
            <td className="p-2 border font-medium">
              {formatCurrency(calculateGrandTotal())}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DynamicInvoiceTable;