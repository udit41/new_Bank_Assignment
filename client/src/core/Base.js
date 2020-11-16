import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Base = ({ children }) => {
  return (
    <div className="baseComponent">
      <Navbar />
      <div className="container" style={{ minHeight: "76vh" }}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Base;
