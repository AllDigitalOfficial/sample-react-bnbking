

import React from 'react';

const footeText = import.meta.env.VITE_APP_FOOTER_COPYRIGHT_TEXT || "#343a40";

const Footer: React.FC = () => (
  
  
  <footer className="container py-4">
    
    <div className="d-flex justify-content-between align-items-center">
      
      <span className='text-white' >© 2025 {footeText} All Right Reserved</span>
      <div className="d-flex gap-3">
        <button  className="btn btn-warning" >SmartContract</button>
        
      </div>
    </div>
  </footer>
);
export default Footer;
