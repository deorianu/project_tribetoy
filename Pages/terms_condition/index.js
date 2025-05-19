import React from "react";

const TermsAndCondition = () => {
  return (
    <div className="container mx-auto p-8 mt-[5rem]">
      <h1 className="text-2xl font-bold mb-4">Terms and Condition</h1>
      
      <p className="mb-4" style={{fontSize: "1.5rem"}}>
      By accessing or purchasing from Green Putola Kendra, you agree to the following terms:
      </p>

      <h3 className="text-md font-semibold mb-2">1. Product Use:</h3>
      <p style={{fontSize: "1.5rem"}}>All our products are intended for personal use.
         Commercial use or reproduction without permission is prohibited.</p>

      <h3 className="text-md font-semibold mb-2">2. Intellectual Property:</h3>
      <p style={{fontSize: "1.5rem"}}>All content, designs, images, and logos on this
         website are the property of Green Putola Kendra and may not be used without consent.</p>

      <h3 className="text-md font-semibold mb-2">3. Pricing and Availability:</h3>
      <p className="mb-4" style={{fontSize: "1.5rem"}}>
      We reserve the right to change prices and product availability without notice. 
      Prices listed are in INR unless stated otherwise.</p>

      <h3 className="text-md font-semibold mb-2">4. Order Acceptance:</h3>
      <p className="mb-4" style={{fontSize: "1.5rem"}}>
      Orders are accepted at our sole discretion. 
      We reserve the right to cancel any order due to stock unavailability, 
      pricing errors, or suspicious activity.</p>

      <h3 className="text-md font-semibold mb-2">5. Liability Limitation:</h3>
      <p className="mb-4" style={{fontSize: "1.5rem"}}>
      We shall not be held responsible for any indirect or consequential damages arising from the use of our products or services.
      </p>
    </div>
  );
};

export default TermsAndCondition;
