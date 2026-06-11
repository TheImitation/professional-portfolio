import React from "react";
import { SOCIALS } from "@/datasets/Site";
import "../styles/components/SidePanel.css";


const SidePanel: React.FC = () => {
  return (
    <div className="side-panel">
      {SOCIALS.map((item, index) => (
        <div className="side-panel-item" key={index}>
          <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.label}>
            <img src={item.icon} alt={item.label} />
          <div className="label">{item.label}</div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default SidePanel;
