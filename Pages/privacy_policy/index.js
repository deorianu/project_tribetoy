import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-8 mt-[5rem]">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      
      <p className="mb-4" style={{fontSize: "1.5rem"}}>
        At Green Putola Kendra, we value your privacy and are committed to protecting your personal information.
        This policy outlines how we collect, use, and protect your data when you visit our website or make a purchase.
      </p>

      <h3 className="text-md font-semibold mb-2">1. Information We Collect:</h3>
      <ul className="list-disc list-inside mb-4 ml-4" style={{fontSize: "1.5rem"}}>
        <li>Name, email address, shipping address, and phone number</li>
        <li>Payment details (processed securely via third-party gateways)</li>
        <li>Website usage data through cookies and analytics tools</li>
      </ul>

      <h3 className="text-md font-semibold mb-2">2. How We Use Your Information:</h3>
      <ul className="list-disc list-inside mb-4 ml-4" style={{fontSize: "1.5rem"}}>
        <li>To process and fulfill your orders</li>
        <li>To send updates, order confirmations, and promotional emails (if opted in)</li>
        <li>To improve website functionality and user experience</li>
      </ul>

      <h3 className="text-md font-semibold mb-2">3. Data Protection:</h3>
      <p className="mb-4" style={{fontSize: "1.5rem"}}>
        We implement industry-standard security measures to safeguard your data. We do not sell or rent your personal information to third parties.
      </p>

      <h3 className="text-md font-semibold mb-2">4. Third-Party Links:</h3>
      <p className="mb-4" style={{fontSize: "1.5rem"}}>
        Our website may contain links to other sites. We are not responsible for their privacy practices.
      </p>

      <h3 className="text-md font-semibold mb-2">5. Contact:</h3>
      <p className="mb-4" style={{fontSize: "1.5rem"}}>
        For any questions regarding this policy, please contact us at tribetoy2025@gmail.com.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
