import React from "react";

const Contact = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-peach-light">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-96">
        <h1 className="text-3xl font-bold text-peach-dark mb-4">Contact Us</h1>
        <p className="text-gray-700">
          <strong>Address:</strong> Centre for Sustainable Polymers,
Technology Complex,
Indian Institute of Technology Guwahati,
Guwahati - 781039
        </p>
        <p className="text-gray-700">
          <strong>Email: vkatiyar@iitg.ac.in</strong> 
        </p>
        <p className="text-gray-700">
          <strong>Phone: 7086050764</strong> 
        </p>
      </div>
    </div>
  );
};

export default Contact;
