import React, { useState } from 'react';
import './Acc.css';

const CollapsibleSections = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (index) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="collapsible-container">
      <h1 className="header">Collapsible Sections</h1>
      {[...Array(6)].map((_, index) => (
        <div key={index} className="section">
          <div className="section-header" onClick={() => toggleSection(index)}>
            <span className="toggle-icon">
              {openSections[index] ? '−' : '+'}
            </span>
            <h2>Section {index + 1}</h2>
          </div>
          {openSections[index] && (
            <div className="section-content">
              <p>This is the content for section {index + 1}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CollapsibleSections;