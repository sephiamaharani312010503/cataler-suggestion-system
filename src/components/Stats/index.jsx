import React from "react";

const Stats = (props) => {
  return (
    <div className="stats shadow ms-2 me-1">
      <div className="stat">
        <div className="stat-figure text-primary"></div>
        <div className="stat-title">{props.statsTitle}</div>
        <div className={`stat-value ${props.statValueStyle} `}>
          {props.statsContent}
        </div>
      </div>
    </div>
  );
};

export default Stats;
