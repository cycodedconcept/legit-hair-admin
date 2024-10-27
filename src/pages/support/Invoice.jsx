// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getInvoiceData } from '../../features/commerceSlice';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const Invoice = () => {
//   const { invoiceData } = useSelector((state) => state.commerce);
//   const token = localStorage.getItem("key");
//   const numberIn = localStorage.getItem("inum");
//   const linkItem = localStorage.getItem("liurl")
//   const dispatch = useDispatch();

//   useEffect(() => {
//       if (token && numberIn) {
//           dispatch(getInvoiceData({ token, invoice_id: numberIn }));
//       }
//   }, [dispatch, token, numberIn]);

// //   const generatePDF = () => {
// //     const doc = new jsPDF();
  
// //     doc.setFontSize(16);
// //     doc.text('Invoice', 14, 10);
  
// //     doc.setFontSize(12);
// //     doc.text(`Invoice ID: ${numberIn}`, 14, 20);
// //     doc.text(`Customer Name: ${invoiceData.customer_name}`, 14, 30);
// //     doc.text(`Email: ${invoiceData.customer_email}`, 14, 40);
// //     doc.text(`Phone Number: ${invoiceData.customer_phonenumber}`, 14, 50);
// //     doc.text(`Amount Paid: N${invoiceData.amount_paid}`, 14, 60);
// //     doc.text(`Delivery State: ${invoiceData.delivery_state}`, 14, 70);
// //     doc.text(`Delivery Address: ${invoiceData.delivery_address}`, 14, 80);
// //     doc.text(`Delivery Landmark: ${invoiceData.delivery_landmark}`, 14, 90);
  
// //     doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 100);
  
// //     doc.autoTable({
// //       startY: 110,
// //       head: [['Initial Amount', 'Discount', 'Inches', 'Quantity', 'Price', 'Total']],
// //       body: invoiceData.products.map((item) => [
// //         `N${item.initial_amount}`, 
// //         `N${item.discounted}`,   
// //         item.inches,
// //         item.order_quantity,
// //         `N${item.product_amount}`,
// //         `N${item.order_quantity * item.product_amount}`,
// //       ]),
// //     });

// //     const linkYPosition = doc.autoTable.previous.finalY + 10;
// //     const linkText = 'Make Payment';
// //     const linkUrl = `${linkItem}`;

// //     doc.setTextColor(0, 0, 255);
// //     doc.textWithLink(linkText, 14, linkYPosition, { url: linkUrl });
  
// //     doc.save('invoice.pdf');
// //   };
  
  

//   return (
//     <div className='jumbotron'>
//       {/* <h2>Invoice Details</h2>
//       {invoiceData ? (
//         <div>
//           <p><strong>Invoice ID:</strong> {invoiceData.invoice_id}</p>
//           <p><strong>Customer Name:</strong> {invoiceData.customer_name}</p>
//           <p><strong>Email:</strong> {invoiceData.customer_email}</p>
//           <p><strong>Delivery Address:</strong> {invoiceData.delivery_address}</p>
//           <p><strong>Delivery State:</strong> {invoiceData.delivery_state}</p>
//           <p><strong>Delivery Landmark:</strong> {invoiceData.delivery_landmark}</p>
//           <p><strong>Total:</strong> {invoiceData.amount_paid}</p>


//           <h3>Products</h3>
//           <ul>
//             {invoiceData?.products?.map((product, index) => (
//               <li key={index}>
//                 {product.product_name} - Quantity: {product.order_quantity} - 
//                 Price: ₦{product.product_amount}
//               </li>
//             ))}
//           </ul>
//           <button onClick={generatePDF}>Download Invoice</button>
//         </div>
//       ) : (
//         <p>Loading invoice details...</p>
//       )} */}
//       <div className="invoice-container">
//             <div className="invoice-header">
//             <div>
//                 <h1>Invoice</h1>
//                 <p>Invoice #: <strong>12345</strong></p>
//                 <p>Date: <strong>October 25, 2024</strong></p>
//             </div>
//             <div>
//                 <p><strong>Company Name</strong></p>
//                 <p>123 Business Rd, Suite 456</p>
//                 <p>City, State, 12345</p>
//                 <p>Email: info@company.com</p>
//             </div>
//             </div>

//             <div className="invoice-details">
//             <p><strong>Billed To:</strong></p>
//             <p>Customer Name</p>
//             <p>789 Customer St.</p>
//             <p>City, State, 67890</p>
//             <p>Email: customer@example.com</p>
//             </div>

//             <table className="invoice-table">
//             <thead>
//                 <tr>
//                 <th>Description</th>
//                 <th>Quantity</th>
//                 <th>Unit Price</th>
//                 <th>Total</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 <tr>
//                 <td>Product 1</td>
//                 <td>2</td>
//                 <td>$50.00</td>
//                 <td>$100.00</td>
//                 </tr>
//                 <tr>
//                 <td>Product 2</td>
//                 <td>1</td>
//                 <td>$150.00</td>
//                 <td>$150.00</td>
//                 </tr>
//                 <tr>
//                 <td className="total" colspan="3" style={{textAlign: "right"}}>Subtotal</td>
//                 <td className="total">$250.00</td>
//                 </tr>
//                 <tr>
//                 <td className="total" colspan="3" style={{textAlign: "right"}}>Tax</td>
//                 <td className="total">$20.00</td>
//                 </tr>
//                 <tr>
//                 <td className="total" colspan="3" style={{textAlign: "right"}}>Total</td>
//                 <td className="total">$270.00</td>
//                 </tr>
//             </tbody>
//             </table>

//             <a href="#" className="btn">Pay Invoice</a>
//         </div>
//     </div>
//   );
// };

// export default Invoice;

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoiceData } from '../../features/commerceSlice';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import DynamicInvoiceTable from './DynamicInvoiceTable';

const Invoice = () => {
  const { invoiceData } = useSelector((state) => state.commerce);
  const token = localStorage.getItem("key");
  const numberIn = localStorage.getItem("inum");
  const linkItem = localStorage.getItem("liurl");
  const dispatch = useDispatch();
  const invoiceRef = useRef();

  useEffect(() => {
    if (token && numberIn) {
      dispatch(getInvoiceData({ token, invoice_id: numberIn }));
    }
  }, [dispatch, token, numberIn]);

//   const tableHeaders = ['Description', 'Quantity', 'Unit Price', 'Total'];
const tableHeaders = ['Product Name', 'Inches', 'Quantity', 'Price', 'Discounted Price', 'Total'];

  const logoUrl = 'logo2.png';

  const totalAmount = invoiceData?.products?.reduce(
    (sum, item) => sum + item.order_quantity * item.product_amount,
    0
  );

  const generatePDF = async () => {
    // Create a clone of the invoice div to modify for PDF
    const invoiceClone = invoiceRef.current.cloneNode(true);
    
    // Remove the buttons from the clone
    const buttons = invoiceClone.querySelectorAll('button, .btn');
    buttons.forEach(button => button.remove());
    
    // Add payment link to clone
    const paymentDiv = document.createElement('div');
    // paymentDiv.innerHTML = `
    //   <div style="margin-top: 20px; color: #0066cc;">
    //     <p>Click here to pay: ${linkItem}</p>
    //   </div>
    // `;
    invoiceClone.appendChild(paymentDiv);

    // Temporarily append clone to document
    document.body.appendChild(invoiceClone);

    try {
      // Convert to canvas
      const canvas = await html2canvas(invoiceClone, {
        scale: 2, // Higher resolution
        logging: false,
        useCORS: true, // Allow loading cross-origin images
        allowTaint: true
      });

      // Remove clone
      document.body.removeChild(invoiceClone);

      // PDF dimensions
      const imgWidth = 210; // A4 width in mm
      const pixelRatio = canvas.width / canvas.height;
      const imgHeight = imgWidth / pixelRatio;

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Add canvas as image
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        0,
        imgWidth,
        imgHeight
      );

      // Add clickable payment link
      pdf.setTextColor(0, 102, 204); // Blue color
      pdf.setFontSize(12);

      localStorage.removeItem('cart');
    
      const linkY = imgHeight + 10;
      pdf.textWithLink('Click here to pay invoice', 14, linkY, {
        url: linkItem
      });

      // Save the PDF
      pdf.save(`invoice-${numberIn}.pdf`);

    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback to basic PDF generation if html2canvas fails
      generateBasicPDF();
    }
  };

  const generateBasicPDF = () => {
    const pdf = new jsPDF();
    
    // Set up fonts and styles
    pdf.setFont('helvetica');
    pdf.setFontSize(20);
    
    // Add logo
    pdf.addImage(logoUrl, 'PNG', 170, 10, 30, 10);
    
    // Add header
    pdf.setFontSize(24);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Invoice', 14, 20);
    
    // Add invoice details
    pdf.setFontSize(12);
    pdf.text(`Invoice ID: ${numberIn}`, 14, 35);
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, 14, 42);
    
    // Add customer details
    pdf.text('Billed To:', 14, 55);
    pdf.setFontSize(11);
    pdf.text(invoiceData.customer_name, 14, 62);
    pdf.text(invoiceData.delivery_address || '', 14, 69);
    pdf.text(`Email: ${invoiceData.customer_email}`, 14, 76);
    
    // Add table
    pdf.autoTable({
      head: [tableHeaders],
      body: invoiceData.products.map(item => [
        item.product_name,
        item.order_quantity,
        `₦${item.product_amount.toLocaleString()}`,
        `₦${(item.order_quantity * item.product_amount).toLocaleString()}`
      ]),
      startY: 85,
      styles: {
        fontSize: 10,
        cellPadding: 5
      },
      headStyles: {
        fillColor: [51, 51, 51]
      }
    });
    
    // Add total
    const finalY = pdf.autoTable.previous.finalY + 10;
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Total: ₦${totalAmount.toLocaleString()}`, 14, finalY);
    
    // Add payment link
    pdf.setTextColor(0, 102, 204);
    pdf.textWithLink('Click here to pay invoice', 14, finalY + 10, {
      url: linkItem
    });
    
    pdf.save(`invoice-${numberIn}.pdf`);
  };

  return (
    <div className='invoice-container' ref={invoiceRef}>
      <div className="d-flex justify-content-between">
          <div>
             <img src={logoUrl} alt="Company Logo" className="w-50" />
          </div>
          <div>
            <p>Invoice ID: <strong>{numberIn}</strong></p>
            <p>Date: <strong>{new Date().toLocaleDateString()}</strong></p>
          </div>
      </div>
      <div className="invoice-details">
        <p><strong>Billed To:</strong></p>
        <p>{invoiceData.customer_name}</p>
        <p>{invoiceData.delivery_address}</p>
        <p>Email: {invoiceData.customer_email}</p>
      </div>
      {/* <table className="invoice-table">
        <thead>
          <tr>
            {tableHeaders.map((header, idx) => <th key={idx}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {invoiceData?.products?.map((item, idx) => (
            <tr key={idx}>
              <td>{item.product_name}</td>
              <td>{item.order_quantity}</td>
              <td>₦{item.product_amount.toLocaleString()}</td>
              <td>₦{(item.order_quantity * item.product_amount).toLocaleString()}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold" }}>Total</td>
            <td style={{ fontWeight: "bold" }}>₦{totalAmount?.toLocaleString()}</td>
          </tr>
        </tbody>
      </table> */}
      <DynamicInvoiceTable data={invoiceData}/>
      <button onClick={generatePDF} className="pro-btn">Download Invoice</button>
      <a href={linkItem} className="btn pay-btn" target="_blank" rel="noopener noreferrer">
        Pay Invoice
      </a>
    </div>
  );
};

export default Invoice;
