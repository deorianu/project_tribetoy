import React from "react";

const OrderCancelReturnPolicy = () => {
  
  return (
    <div className="container mx-auto p-8 mt-[5rem]">
      <h1 className="text-2xl font-bold mb-4">Cancellation & Returns</h1>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">1. Cancellation Policy:</h2>
        <p className="mb-4" style={{fontSize: "1.5rem"}} >
        We do not accept order cancellations once the order is confirmed and payment is completed. 
        Please review your order carefully before placing it.
        </p>
        
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">2. Returns Policy:</h2>
        <p className="mb-4" style={{fontSize: "1.5rem"}}>
        All items sold by TribeToy are non-returnable and non-refundable, 
        as our products are made-to-order or customized. 
        In the rare event of receiving a damaged or defective item,
         please contact us within 24 hours of delivery with clear photos and order details.
        </p>
        
      </div>
    </div>
  );
};

export default OrderCancelReturnPolicy;