

import React from 'react';

const footeText = import.meta.env.VITE_APP_FOOTER_COPYRIGHT_TEXT || "#343a40";

const Footer: React.FC = () => (
  
  
  <footer className="container py-4">
    
    <div className="d-flex justify-content-center align-items-center text-white text-center"> © 2025 {footeText} All Right Reserved
      

     
    </div>
  </footer>
);
export default Footer;
