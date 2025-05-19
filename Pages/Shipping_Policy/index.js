import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="container mx-auto p-8 mt-[5rem]">
      <h1 className="text-2xl font-bold mb-4">Shipping Policy</h1>
      
      

      <h3 className="text-md font-semibold mb-2">1. Processing Time:</h3>
      <p style={{fontSize: "1.3rem"}}>Orders are typically processed within 3–7 business days. Custom orders may require additional time.</p>

      <h3 className="text-md font-semibold mb-2">2. Shipping Methods:</h3>
      <p style={{fontSize: "1.3rem"}}>We ship via trusted courier services. 
        Delivery times vary by location (generally 5–10 business days).</p>

      <h3 className="text-md font-semibold mb-2">3. Tracking:</h3>
      <p className="mb-4" style={{fontSize: "1.3rem"}}>
      Once shipped, a tracking number will be shared via email/SMS.
      </p>

      <h3 className="text-md font-semibold mb-2">4. Shipping Charges:</h3>
      <p className="mb-4" style={{fontSize: "1.3rem"}}>
      Shipping charges are calculated at checkout based on order weight and delivery location.
      </p>

      <h3 className="text-md font-semibold mb-2">5. Delivery Issues:</h3>
      <p className="mb-4" style={{fontSize: "1.3rem"}}>
      Green Putola Kendra is not liable for delays caused by courier agencies, weather, or unforeseen events. Please ensure accurate address details to avoid failed deliveries.
      </p>
    </div>
  );
};

export default ShippingPolicy;
